import dotenv from "dotenv"; 

dotenv.config(); 

//constant Variables
export const ENV_VARS = {
  PORT: process.env.PORT,
  host: process.env.PG_HOST,
  pg_port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
} 