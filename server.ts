import express from "express";
import cors from "cors";
import { auth } from "./routes/authentication";

const app = express();
app.use(cors());

app.use("/auth", auth);

app.get("/api", (req: express.Request, res: express.Response) => {
  res.json({ message: "Hello from server!" });
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log("SERVER STARTED");
});
