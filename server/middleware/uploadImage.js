import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import config from "../config/config";
import randToken from "rand-token";

const { AWSAccessKeyId, AWSSecretKey } = config;

aws.config.update({
  secretAccessKey: AWSSecretKey,
  accessKeyId: AWSAccessKeyId,
  region: "us-east-2"
});

const S3 = new aws.S3();
const fileName = () => {
  return randToken.generate(32);
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid File Type, Only JPEG or PNG"), false);
  }
};

const upload = multer({
  fileFilter,
  limits: { fileSize: 300000 },
  storage: multerS3({
    s3: S3,
    acl: "public-read",
    bucket: "preflight-shop",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, fileName() + ".jpg");
    }
  })
});

module.exports = upload;
