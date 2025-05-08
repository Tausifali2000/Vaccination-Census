import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from 'url';
import { ENV_VARS } from "./config/envVars.config.js";
import fetchRoutes from "./routes/routes.js";

const app = express();


app.use(express.json());

const PORT = ENV_VARS.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173"
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(fetchRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});