import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // aca se guarda
  },
  filename: (req, file, cb) => {
    const uniqueSuf = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuf + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype.startsWith("image/");
  cb(null, isImage);
};

export const upload = multer({ storage, fileFilter });
