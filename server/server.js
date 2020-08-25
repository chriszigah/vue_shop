import fs from "fs";
import path from "path";
import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
const MongoStore = require("connect-mongo")(session);
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import morgan from "morgan";
import helmet from "helmet";
//import sendEmail from "./config/email";
import config from "./config/config";
const {
  MONGO_URI,
  SECRET_SESSION_NAME,
  SESSION_COOKIE_NAME,
  COOKIE_EXPIRATION_MS,
  NODE_ENV
} = config;

// Passport Config
import initAuthMiddleware from "./middleware/initpassport";

// Import Routes
import indexRouter from "./routes";

// Connect MongoDB
connectDB(MONGO_URI);

//Initialize App
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.enable("trust proxy");

// Session
//MongoStore({ session });
app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: SECRET_SESSION_NAME,
    name: SESSION_COOKIE_NAME,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: NODE_ENV === "production",
      expires: Date.now() + parseInt(COOKIE_EXPIRATION_MS, 10),
      maxAge: parseInt(COOKIE_EXPIRATION_MS, 10)
    }
  })
);

// CORS
const corsConfig = {
  origin: "http://localhost:3000",
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  credentials: true
};

app.use(cors(corsConfig));

// Passport middleware
initAuthMiddleware(app);

// Helmet (no-cache)
app.use(helmet());

// Morgan Logs
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a"
  }
);
app.use(morgan("dev"));
app.use(morgan("combined"));
app.use(morgan("combined", { stream: accessLogStream }));
morgan.token("sessionid", function (req, res, param) {
  return req.sessionID ? req.sessionID : "NO SESSION ";
});

morgan.token("user", function (req, res, param) {
  try {
    return req.session.user;
  } catch (error) {
    return null;
  }
});

app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :user :sessionid'
  )
);

// Routers
app.use("/", indexRouter);

// Sending Emails
const message = {
  text: "i hope this works",
  from: "Christian Zigah <christian@standalone_server.com>",
  to: "efochristian@outlook.com",
  cc: "",
  subject: "Testing emailjs",
  attachment: [
    { data: "<html>i <i>hope</i> this works!</html>", alternative: true }
    //{ path: "path/to/file.zip", type: "application/zip", name: "renamed.zip" }
  ]
};

//sendEmail(message);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
