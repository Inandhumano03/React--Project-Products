import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
// import { users } from "./utils/constants.js";
import { User } from '../src/mongoose/schema/user.mjs'
// import userRouter from './routes/users.mjs'
// import productRouter from './routes/products.mjs'
import routes from "./routes/router.mjs"
import mongoose from "mongoose";
import { comparePassword } from "./utils/helper.mjs";
import connectDB from "./db/connectDB.mjs";
import cors from "cors";
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser("codeio"));


app.use(session(
    {
        secret: "romba secret",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60,
            //for a partivcular session cookies are geneerated 
        }
    }
))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    { usernameField: "user_name", passwordField: "password" },
    async (user_name, password, done) => {
        console.log("here");
        try {

            const user = await User.findOne({ user_name: user_name })  //mongo db connection to get users 
            if (!user) {
                return done(null, false, { msg: "Invalid Username" });
            }
            const isMatch = await comparePassword(password, user.password);

            if (!isMatch) {
                return done(null, false, {
                    msg: "Incorrect Password"
                });
            }
            return done(null, user);
        }
        catch (err) {
            console.log(err);
            return done(err, false);
        }
        // const user=users.find((user)=>user.user_name===user_name);


    }));

passport.serializeUser((user, done) => {
    done(null, user.id);
}); //stores in cookies

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);

        done(null, user);
    } catch (err) {
        console.log(err);
        done(err, false);
    }
});//retrieve  from cookies using ids

app.use(routes);

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
app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({ msg: info?.msg || "Login failed" });
        }
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.json({
                msg: "Login successful",
                user: {
                    id: user._id,
                    user_name: user.user_name
                }
            });
        });
    })(req, res, next);
});
//server port 
const start = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

start();