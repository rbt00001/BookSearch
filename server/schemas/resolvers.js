const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models/index.js");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return await User.findOne({ _id: context.user._id })
        .populate("classes")
        .populate({
          path: "classes",
          populate: "professor",
        });
    },
    
    
  Mutation: {
    addUser: async (parent, args) => {
       const newuser = await User.create(args)
       const token = signToken(newuser)
       return {token, newuser}
    },
    login: async (parent,{email, password}) => {
      // Find and update the matching class using the destructured args
      const findUser =  await User.findOne(
        { email })   
         const token = signToken(newuser)
        return {token, newuser}
        // Return the newly updated object instead of the original
    },
  },
};

module.exports = resolvers;
