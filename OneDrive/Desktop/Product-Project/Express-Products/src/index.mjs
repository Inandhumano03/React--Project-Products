import http from "http";
import { Server } from "socket.io";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
// import { users } from "./utils/constants.js";
import User  from '../src/mongoose/schema/user.mjs'
// import userRouter from './routes/users.mjs'
// import productRouter from './routes/products.mjs'
import routes from "./routes/router.mjs"
import mongoose from "mongoose";
import { comparePassword } from "./utils/helper.mjs";
import connectDB from "./db/connectDB.mjs";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();

//websocket server creation
const server = http.createServer(app);

//localhost endpoint for server
export const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});
//setting io websocket
app.set("io", io);

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser("codeio"));


// app.use(session(
//     {
//         secret: "romba secret",
//         saveUninitialized: false,
//         resave: false,
//         cookie: {
//             maxAge: 60000 * 60,
//             //for a partivcular session cookies are geneerated 
//         }
//     }
// ))

app.use(passport.initialize());
// app.use(passport.session());

passport.use(
  new LocalStrategy(
    { usernameField: "user_name", passwordField: "password" },
    async (user_name, password, done) => {
      console.log("Username received:", user_name);

      try {
        const user = await User.findOne({ user_name });

        console.log("User found:", user);

        if (!user) {
          return done(null, false, { msg: "Invalid Username" });
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
          return done(null, false, { msg: "Incorrect Password" });
        }

        return done(null, user);
      } catch (err) {
        console.log(err);
        return done(err);
      }
    }
  )
);
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// }); //stores in cookies

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);

//         done(null, user);
//     } catch (err) {
//         console.log(err);
//         done(err, false);
//     }
// });//retrieve  from cookies using ids

app.use(routes);

//connection estableishment
io.on("connection", (socket) => {

    console.log("User Connected :", socket.id);

    socket.on("disconnect", () => {

        console.log("User Disconnected :", socket.id);

    });

});

const PORT = 3000;

app.get("/", (req, res) => {
    res.cookie("user", "Admin", { maxAge: 60000 * 60, signed: true });
    console.log(req.session);
    console.log(req.session.id);
    req.sessionStore.get(req.session.id, (err, sessionData) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(sessionData);
        }
    })
    res.send({ msg: "Root" });
})

//server port 
const start = async () => {

    await connectDB();

    server.listen(PORT, () => {

        console.log(`Server is running on port ${PORT}`);

    });

};

start();