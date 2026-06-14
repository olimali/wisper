import express from "express";
import { clerkMiddleware } from '@clerk/express'

import authRoutes from "./routes/auth.routes";
import chatRoutes from "./routes/chat.routes";
import messageRoutes from "./routes/message.routes";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;