const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const pino = require("pino");

const log = pino({ level: process.env.LOG_LEVEL || "info" });
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/healthz", (req, res) => res.json({ status: "ok", uptime: process.uptime() }));
app.get("/", (req, res) => res.json({ service: process.env.SERVICE_NAME || "api", version: "1.0.0" }));

app.listen(PORT, () => log.info({ port: PORT }, "Server started"));
module.exports = app;
