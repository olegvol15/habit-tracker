import express from "express";
import "dotenv/config";
import { prisma } from "./db/prisma.js";

const app = express();
app.use(express.json());
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.post("/users", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "Valid email is required" });
    }

    const user = await prisma.user.create({
      data: { email },
    });

    return res.status(201).json(user);
  } catch (err) {
    if (err?.code === "P2002") {
      return res.status(409).json({ error: "Email already exists" });
    }
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
