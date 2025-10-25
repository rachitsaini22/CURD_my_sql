import express from "express";
import user1Routes from "./routes/user1.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api" ,user1Routes);

app.listen(3000, () => {
  console.log(" Server running on http://localhost:3000");
});
