function getUsers() {
  return getFetch("https://jsonplaceholder.typicode.com/users");
}

function getUserPosts(userId) {
  return getFetch(`https://jsonplaceholder.typicode.com/posts`, { userId });
}

getUsers().then((users) => {
  users.forEach((user) => {
    getUserPosts(user.id).then((posts) => {
      console.log(user.name);
      console.log(posts.length);
    });
  });
});

// function getFetch(url, params = {}) {
//   const query = Object.entries(params)
//     .map((param) => `${(param[0] = param[1])} `)
//     .join(`&`);
//   console.log(`${url}?${query}`);

//   return fetch(`${url}?${query}`, {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   }).then((res) => res.json());
// }

function getFetch(url, params = {}) {
  return axios.get(url, params).then((res) => res.data);
}
