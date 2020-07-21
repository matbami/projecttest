const User = require("../Models/User");
const jwt = require("jsonwebtoken");


const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, "thisismyproject");
        const user = await User.findById({ _id: decoded._id, "tokens.token": token })


        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send(e);
    }
};

const auth2 = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, "thisismyproject");
        const user = await User.findById({
            _id: decoded._id,
            "tokens.token": token,
        });

        if (user.role != "admin") {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        console.log(e)
        res.status(401).send({ error: "permission denied" });
    }
};

module.exports = { auth2, auth }