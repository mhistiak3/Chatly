import multer from "multer";

const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
const singleAvatar = upload.single("avatar");
const attchmentsUpload = upload.array("files", 5);
export { singleAvatar, attchmentsUpload };
