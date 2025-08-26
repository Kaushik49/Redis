import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient();

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

async function startServer() {
  try {
    await client.connect();
    console.log("Redis connected");

    app.post("/submit", async (req, res) => {
      const { problemId, userId, code, language } = req.body;

      await client.lPush(
        "submissions",
        JSON.stringify({ problemId, userId, code, language }),
      );

      res.json({ message: "submission received" });
    });

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (err) {
    console.error("Could not start server:", err);
  }
}

startServer();
