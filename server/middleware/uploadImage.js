import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import config from "../config/config";

const { AWSAccessKeyId, AWSSecretKey } = config;

aws.config.update({
  secretAccessKey: AWSSecretKey,
  accessKeyId: AWSAccessKeyId,
  region: "us-east-2"
});

const S3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: S3,
    acl: "public-read",
    bucket: "preflight-shop",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + ".jpg");
    }
  })
});

module.exports = upload;
