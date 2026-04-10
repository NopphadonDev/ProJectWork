require("dotenv").config();
const app = require("./app");
const { checkDbConnection } = require("./config/db");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await checkDbConnection();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();