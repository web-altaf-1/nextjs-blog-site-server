
const { findUserByEmailService, signupService } = require("../services/user.services");
const { generateToken } = require("../utils/generateToken");

exports.signup = async (req, res) => {
    try {
        const data = req.body;
        const { email } = data;
        const isAvailableUser = await findUserByEmailService(email);
        if (isAvailableUser) {
            return res.status(404).json({
                status: 0,
                error: "User already existed",
            });
        }
        const result = await signupService(data);
        const token = generateToken(result);
        res.status(200).json({
            status: 1,
            message: "Signup successful",
            token,
        });
    } catch (error) {
        res.status(400).json({
            status: 0,
            error: error.message,
        });
    }
};

exports.findUserByEmail = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                status: 0,
                error: "Please give your credentials",
            });
        }

        const user = await findUserByEmailService(email);

        if (!user) {
            return res.status(401).json({
                status: 0,
                error: "No result found with this email",
            });
        }

    
        const isValidPassword = user.comparePassword(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                status: 0,
                error: "Password not matched",
            });
        }

        const token = generateToken(user);

        res.status(200).json({
            status: 1,
            message: "Successfully logged in",
            data: user,
            token,
        });
    } catch (error) {
        res.status(400).json({
            status: 0,
            error: error.message,
        });
    }
};

exports.getMe = async (req, res) => {
    try {
        const { email } = req.user;
        const result = await findUserByEmailService(email);
        if (!result) {
            return res.status(400).json({
                status: 0,
                error: "Token is not verified",
            });
        }

        res.status(200).json({
            status: 1,
            message: "successfully get data",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: 0,
            error: error.message,
        });
    }
};



exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({
            status: "success",
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
exports.getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await findUserByEmailService(email);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(400).json({
            status: "failed",
            error: error.message,
        });
    }
};

