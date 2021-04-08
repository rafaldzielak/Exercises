const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const post = require("../models/post");

module.exports = {
  createUser: async (args, req) => {
    console.log("Signup");
    const { email, name, password } = args.userInput;
    const errors = [];
    if (!validator.isEmail(email)) errors.push("Please enter valid email");
    if (validator.isEmpty(password) || !validator.isLength(password, { min: 5 })) {
      errors.push("Please enter a stronger password");
    }
    if (errors.length > 0) {
      const error = new Error("Invalid input");
      error.data = errors;
      throw error;
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, name, password: hashedPassword });
    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  },

  loginUser: async ({ email, password }, req) => {
    console.log("Login");
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      error.code = 401;
      throw error;
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      const error = new Error("Incorrect password");
      error.code = 401;
      throw error;
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, "SomeSecretKey", { expiresIn: "1h" });
    return { token, userId: user._id.toString(), status: 200 };
  },

  createPost: async ({ postInput }, req) => {
    console.log("Create post");
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      error.code = 401;
      throw error;
    }

    const errors = [];
    const { title, content, imageUrl } = postInput;
    if (validator.isEmpty(title || !validator.isLength(title, { min: 5 }))) {
      errors.push({ message: "Invalid title" });
    }
    if (validator.isEmpty(content || !validator.isLength(content, { min: 5 }))) {
      errors.push({ message: "Invalid content" });
    }
    if (errors.length > 0) {
      const error = new Error("Invalid input");
      error.data = errors;
      throw error;
    }
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Invalid User!");
      error.code = 401;
      throw error;
    }
    const post = new Post({ title, content, imageUrl, creator: user });
    const createdPost = await post.save();
    user.posts.push(createdPost);
    user.save();

    // Add post to users' posts
    return {
      ...createdPost._doc,
      _id: createdPost._id.toString(),
      createdAt: createdPost.createdAt?.toISOString(),
      updatedAt: createdPost.updatedAt?.toISOString(),
    };
  },

  posts: async ({ page = 1 }, req) => {
    console.log("get posts");
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      error.code = 401;
      throw error;
    }
    const perPage = 2;
    const totalPosts = await Post.find().countDocuments();
    const posts = await Post.find()
      .sort({ creteatedAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate("creator");
    return {
      posts: posts.map((post) => ({
        ...post._doc,
        _id: post._id.toString,
        createdAt: post.createdAt?.toISOString(),
        updatedAt: post.updatedAt?.toISOString(),
      })),
      totalPosts,
    };
  },
};
