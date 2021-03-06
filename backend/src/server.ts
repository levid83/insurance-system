import express from "express";
import helmet from "helmet";
import cors from "cors";

export function createServer() {
  const { initializeRoutes } = require("./api/routes");

  const app = express();

  app.use(cors());

  app.use(helmet());
  app.use(express.json());

  initializeRoutes(app);

  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });
  return app;
}
