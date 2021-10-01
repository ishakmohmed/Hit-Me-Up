const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://hit-me-up-mern-app.herokuapp.com/";

module.exports = baseUrl;
