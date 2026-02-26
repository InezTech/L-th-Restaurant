/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require("dotenv").config();
const path = require("path");

const {
  DATABASE_URL_DEVELOPMENT,
  DATABASE_URL_TEST,
  DATABASE_URL_PREVIEW,
  DATABASE_URL,
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "sqlite3",
    connection: { filename: path.join(__dirname, "dev.sqlite3") },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "sqlite3",
    connection: { filename: ":memory:" },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "sqlite3",
    connection: { filename: path.join(__dirname, "preview.sqlite3") },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "sqlite3",
    connection: { filename: path.join(__dirname, "prod.sqlite3") },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
