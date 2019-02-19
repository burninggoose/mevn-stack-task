module.exports = {
  info: {
    title: "test api",
    version: "1.0.0",
    description: "API for test task"
  },
  schemes: ["http"],
  host: "127.0.0.1:3000",
  apis: ["./endpoints/**/*.js", "./models/*.js"],
  basePath: "/"
};
