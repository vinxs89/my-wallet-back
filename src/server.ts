import express from "express";

import connectDB from "../config/database";
import auth from "./routes/api/auth";
import user from "./routes/api/user";
import profile from "./routes/api/profile";
import movements from "./routes/api/movements";
import accounts from "./routes/api/accounts";

const app = express();

// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/api/auth", auth);
app.use("/api/users", user);
app.use("/api/profiles", profile);
app.use("/api/accounts", accounts);
app.use("/api/accounts/:accountId/movements", movements);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
