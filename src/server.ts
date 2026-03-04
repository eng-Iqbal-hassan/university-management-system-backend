import express from "express";
import subjectsRouter from "./routes/subject";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}))

app.use(express.json());

app.use('/api/subjects', subjectsRouter);

app.get("/", (_req, res) => {
  res.status(200).json({ message: "University backend is running." });
});

app.listen(port, () => {
  console.log(`Server running at the http://localhost:${port}`);
});
