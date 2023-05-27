import express from "express";
import bookRoutes from "./routes/books";
import connectToDB from "./database/db";
import dotenv from "dotenv";
import cors from "cors";
import compression from 'compression';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(compression())
app.use(express.json({ limit: "10mb" }));
app.use("/books", bookRoutes);

const establishConnection = async () => {
  try {
    await connectToDB();
    startListening();
  } catch (err) {
    console.log(err);
  }
};
establishConnection();
function startListening() {
  return app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}
