import multer from "multer";

const avatarUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

export { avatarUpload };
