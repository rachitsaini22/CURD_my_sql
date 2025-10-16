import express from "express";
import user1Routes from "./routes/user1.js";
const app = express();

app.use(express.json());
app.use("/api" ,user1Routes);

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
