import { Router } from "express"
import { getUserIndexById } from "../utils/middlewares.mjs";
import { createUserValidationSchema } from "../utils/validationSchema.js";
import { validationResult, matchedData, checkSchema } from "express-validator";
import cookieParser from "cookie-parser";
import { users } from '../utils/constants.js'
import User from '../mongoose/schema/user.mjs'
import { hashPassword } from "../utils/helper.mjs";
import passport from "passport";
import {
    generateAccessToken,
    generateRefreshToken
} from "../utils/jwt.mjs";
import { verifyJWT } from "../utils/auth.mjs";
import jwt from "jsonwebtoken"
const router = Router();


//all users
router.get("/api/users", verifyJWT, (req, res) => {
    res.send(users);

});


//search query user params
router.get("/api/user", (req, res) => {
    // console.log("Query:", req.query);
    // console.log("Filter:", req.query.filter);
    // console.log("Value:", req.query.value);
    console.log(req.signedCookies);
    if (req.signedCookies.user && req.signedCookies.user === "Admin") {
        if (req.query.filter && req.query.value) {
            const result = users.filter((user) =>
                user[req.query.filter]
                    .toLowerCase()
                    .includes(req.query.value.toLowerCase())
            );
        }
        return res.send(users);

    }
    else {
        return res.send({ msg: "You aere not admin" });
    }

});


//user by ID
router.get("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ msg: "Invalid Request,No user ID found" });
    }
    const user = users.find(user => user.id === id);
    if (!user) {
        res.status(404).send({ msg: "No user found with given ID" });
    }
    else {
        res.send(user);
    }
})

// post request

// router.post("/api/users",
//     checkSchema(createUserValidationSchema)
//     , async (req, res) => {
//         const result = validationResult(req);
//         console.log(result);
//         console.log(req['express-validator#contexts']);
//         //without u_name validation error should be shown in response and if console.log(req) not given
//         if (!result.isEmpty()) {
//             return res.status(400).send({ errors: result.array() });
//         }
//         const body = matchedData(req);
//         body.password = hashPassword(body.password);
//         const newUser = new User(body);
//         try {
//             const savedUser = await newUser.save();

//             return res.status(201).send(newUser);
//         }
//         catch (err) {
//             console.error("Save Error:", err);

//             return res.status(400).json({
//                 msg: "User not Saved",
//                 error: err.message,
//                 name: err.name
//             });
//         }

//         // const newUser = { id: users[users.length - 1].id + 1, ...matchedData(req) };
//         // // users.push(newUser);//replaced by mongodb code


//     });
router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        errors: result.array(),
      });
    }

    const body = matchedData(req);

    body.password = hashPassword(body.password);

    try {
      const newUser = new User(body);

      const savedUser = await newUser.save();

      return res.status(201).json(savedUser);
    } catch (err) {
      console.error(err);

      return res.status(400).json({
        msg: "User not saved",
        error: err.message,
      });
    }
  }
);


//put request
router.put("/api/users/:id", getUserIndexById, (req, res) => {
    //  const id=parseInt(req.params.id);
    // if(isNaN(id)){
    //    return res.status(400).send({msg:"Invalid Request,No user ID found"});
    // }
    // const userIndex=users.findIndex((user)=>user.id===id);
    // if(userIndex===-1){
    //     return res.status(404).send({msg:"No user found with given ID"});
    // }
    const id = parseInt(req.params.id);
    const userIndex = req.userIndex;
    users[userIndex] = { id: id, ...req.body };
    return res.status(200).send({ msg: "User updated successfully" });
})


//patch request
router.patch("/api/users/:id", getUserIndexById, (req, res) => {
    const userIndex = req.userIndex;
    users[userIndex] = { ...users[userIndex], ...req.body };
    return res.status(200).send({ msg: "User updated successfully" });
})


//delete user
router.delete("/api/users/:id", getUserIndexById, (req, res) => {
    const userIndex = req.userIndex;

    users.splice(userIndex, 1);
    return res.status(200).send({ msg: "User deleted successfully" });
})


router.post("/api/login", (req, res, next) => {

    passport.authenticate("local", (err, user, info) => {

        if (err)
            return next(err);

        if (!user)
            return res.status(401).json({
                msg: info?.msg || "Login failed"
            });

        const accessToken = generateAccessToken(user);

        const refreshToken = generateRefreshToken(user);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

       return  res.json({

            msg: "Login Successful",

            accessToken,
            refreshToken,

            user: {

                id: user._id,

                user_name: user.user_name,

                role: user.role
            }

        });
        console.log(accessToken);

    })(req, res, next);

});

router.post("/api/login", (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)

        return res.status(401).json({
            msg: "No Refresh Token"
        });

    jwt.verify(

        refreshToken,

        process.env.JWT_REFRESH_SECRET,

        (err, decoded) => {

            if (err)

                return res.status(403).json({
                    msg: "Invalid Refresh Token"
                });

            const accessToken = jwt.sign(

                {

                    id: decoded.id

                },

                process.env.JWT_SECRET,

                {

                    expiresIn: ACCESS_TOKEN_EXPIRES

                }

            );
            console.log(res.accessToken);
            res.json({

                accessToken

            });

        }

    );

});

export default router;