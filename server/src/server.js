import dotenv from "dotenv";
import app from "./app.js";
import { connectDatabase } from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 5000;

const startServer = async () => {
  await connectDatabase();

  const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  const shutdown = (signal) => {
    console.log(`${signal} received. Shutting down gracefully...`);
    server.close(() => process.exit(0));
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
};

startServer().catch((error) => {
  console.error("Server startup failed:", error.message);
  process.exit(1);
});
