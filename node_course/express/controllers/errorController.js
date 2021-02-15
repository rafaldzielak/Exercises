export const get404 = (req, res) => {
  // res.status(404).sendFile(path.resolve("views", "404.html"));
  res.render("404", { path: null });
};
