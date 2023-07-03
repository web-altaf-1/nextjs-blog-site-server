const User = require("../models/User");

exports.findUserByEmailService = async (email) => {
    const result = await User.findOne({ email });
    return result;
};
exports.signupService = async (data) => {
    const result = await User.create(data);
    return result;
};

exports.updateProfileService = async (id, data) => {
    const result = await User.updateOne({ _id: id }, { $set: data });
    return result;
};

exports.getAllUsers = async () => {
    const users = await User.find();
    return users;
};
exports.getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
};
