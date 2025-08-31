import express from "express";
import cors from "cors";
import { getUsers } from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());
app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const users = await getUsers(page, 10);
  res.render("index", { users, page });
});

app.listen(80, () => {
    console.log("Server is running on port 80");
});
