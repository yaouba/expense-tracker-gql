import { users } from "../dummyData/data.js";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

const userResolver = {
    Query: {
        authUser: async (_, __, context) => {
            try {
                const user = await context.getUser()
                return user
                
            } catch (error) {
               console.log('Error in authUser: ', error);
               throw new Error(error.message || "Internal server error")
            }
        },
        user: async (_, { userId }) => {
            try {
                const user = await User.findById(userId);
                return user;
            } catch (error) {
                console.log('Error in user: ', error);
                throw new Error(error.message || "Internal server error")
            }
        },
    },
    Mutation: {
        signUp: async (_, { input }, context) => {
            try {
                const { username, name, password, gender } = input;

                if (!username || !name || !password || !gender) {
                    throw new Error("Missing required fields");
                }

                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    throw new Error("User already exists");
                }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const profilePicEnpoint = `https://avatar.iran.liara.run/public/${gender === "male" ? "boy" : "girl"}?username=${username}`;

                const newUser = new User({
                    username,
                    name,
                    password: hashedPassword,
                    profilePicture: profilePicEnpoint,
                    gender,
                });

                await newUser.save();
                await context.login(newUser);

                return newUser;
            } catch (error) {
                console.log('Error in signup: ', error);
                throw new Error(error.message || "Internal server error")                
            }
        },

        login: async (_, { input }, context) => {
            try {
                const { username, password } = input;

                const { user } = await context.authenticate("graphql-local", { username, password });

                await context.login(user);
               
                return user;
            } catch (error) {
                console.log('Error in login: ', error);
                throw new Error(error.message || "Internal server error")
            }
        },

        logout: async (_, __, context) => {
            try {
                await context.logout();
                req.session.destry((err) => {
                    if (err) throw err
                });

                res.clearCookie('connect.sid')

                return { success: true, message: "Logged out successfully" };
            } catch (error) {
                console.log('Error in logout: ', error);
                throw new Error(error.message || "Internal server error")
            }
        },
    },
};

export default userResolver;