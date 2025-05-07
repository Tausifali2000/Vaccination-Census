import pkg from 'pg';
import { ENV_VARS } from './envVars.config.js';

const { Pool } = pkg;

const pool = new Pool({
  host: ENV_VARS.host,
  port: ENV_VARS.pg_port,
  user: ENV_VARS.user,
  password: ENV_VARS.password,
  database: ENV_VARS.database,
});

export default pool;
