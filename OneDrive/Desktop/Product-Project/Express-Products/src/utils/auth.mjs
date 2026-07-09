import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader)

        return res.status(401).json({
            msg: "No Token"
        });

    const token = authHeader.split(" ")[1];

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {

            if (err)

                return res.status(403).json({
                    msg: "Invalid Token"
                });

            req.user = decoded;

            next();

        }
    );

};