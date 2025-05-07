import express from "express"; 

import cors from "cors"; 
import { ENV_VARS } from "./config/envVars.config.js";
import fetchRoutes from "./routes/routes.js"

const app = express();


app.use(express.json());

const PORT = ENV_VARS.PORT || 3000;

app.use(cors({
  origin:  "http://localhost:5173"}));



app.use( fetchRoutes)


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});