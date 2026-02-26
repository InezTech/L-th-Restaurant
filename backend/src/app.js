const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const reservationsRouter = require("./reservations/reservations.router");
const tablesRouter = require("./tables/tables.router");

const app = express();

// PRODUCTION CORS CONFIGURATION
const allowedOrigins = [
    "http://localhost:3000", // Admin Panel Local
    "http://localhost:5173", // Customer Site Local
    "http://localhost:5174",
    "http://localhost:5175",
    "https://lethe-dining.netlify.app", // Example Prod URL
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // 1. Allow internal requests (no origin)
        // 2. Allow any localhost during development
        // 3. Allow explicitly defined production URLs
        if (!origin || origin.includes("localhost") || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error("CORS Blocked Origin:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    optionsSuccessStatus: 204
}));

app.use(express.json());

app.use("/reservations", reservationsRouter);
app.use("/dashboard", reservationsRouter);
app.use("/tables", tablesRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
