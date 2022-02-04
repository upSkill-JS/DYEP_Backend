import express from "express";
import {
  createUser,
  deleteAccount,
  getAccount,
  loginUser,
  updateAccount,
} from "../controllers/user.js";
import { verifyTokenAndAuthorization } from "../controllers/verifyToken.js";
import multer from "multer";

const router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/avatars/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now());
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var avatarUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 12,
  },
  fileFilter: fileFilter,
});

router.post("/register", avatarUpload.single("avatar"), createUser);
router.post("/login", loginUser);
router.get("/:id", verifyTokenAndAuthorization, getAccount);
router.put("/:id", verifyTokenAndAuthorization, updateAccount);
router.delete("/:id", verifyTokenAndAuthorization, deleteAccount);

export default router;
