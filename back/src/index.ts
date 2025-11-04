import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";
import { logger } from "./utils/logger";
import { errorHandler } from "./utils/errorHandler";

const app = express();
const PORT = process.env.PORT || 3000;

let corsOptions = {
  origin: "http://127.0.0.1:8080",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);
app.use("/tasks", taskRoutes);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
