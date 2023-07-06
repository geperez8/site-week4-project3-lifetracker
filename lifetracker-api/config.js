require("dotenv").config();
require("colors");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

const getDatabaseUri = () => {
  const dbUser = process.env.DATABASE_USER || "postgres";
  const dbPass = process.env.DATABASE_PASS
    ? encodeURI(process.env.DATABASE_PASS)
    : "postgres";
  const dbHost = process.env.DATABASE_HOST || "localhost";
  const dbPort = process.env.DATABASE_PORT || 5432;
  const dbName = process.env.DATABASE_NAME || "lifetracker";

  // if DATABASE_URL environment variable, use that,
  // otherwise create the db connection string ourself

  return (
    process.env.DATABASE_URL ||
    `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
  );
};

const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR;

const SECRET_KEY = process.env.SECRET_KEY;

console.log("Lifetracker API config".red);
console.log("PORT:".blue, PORT);
console.log("Database URI:".blue, getDatabaseUri());
console.log("-----");

module.exports = {
  PORT,
  getDatabaseUri,
  BCRYPT_WORK_FACTOR,
  SECRET_KEY,
};
