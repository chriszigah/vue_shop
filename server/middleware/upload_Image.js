import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import config from "./config/config";

const { AWSAccessKeyId, AWSSecretKey } = config;

aws.config.update({
  secretAccessKey: AWSAccessKeyId,
  accessKeyId: AWSSecretKey
});

const s3 = new aws.s3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "preflight-shop",
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldName });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    }
  })
});

module.export = upload;
