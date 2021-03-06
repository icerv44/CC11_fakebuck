require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const friendRouter = require("./routes/friendRoute");
const postRouter = require("./routes/postRoute");
const authenticate = require("./middlewares/authenticate");
const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");

// const { sequelize } = require("./models");
// sequelize
//   .sync({ force: true })
//   .then(() => console.log("DB synced!"))
//   .catch((err) => console.log(err));

const app = express();
app.use(cors());

if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/users", authenticate, userRouter);
app.use("/friends", authenticate, friendRouter);
app.use("/posts", authenticate, postRouter);
// app.use("/comments", authenticate, commentRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server running on port: " + port);
});
