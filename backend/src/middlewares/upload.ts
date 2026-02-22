import multer from "multer";
import path from "path";
import crypto from "crypto";
import { BadRequestError } from "../errors/AppError";

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), "uploads/avatars"),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});

export const uploadAvatar = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new BadRequestError("Only JPEG, PNG, WebP and GIF images are allowed") as unknown as null, false);
    }
  },
}).single("avatar");
