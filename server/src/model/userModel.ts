import IUser from "../interface/userInterface";
import mongoose, {Schema, model} from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true,
    },
    email: {
        type: "string",
        required: true,
    },
    password: {
        type: "string",
        required: true
    }
});

const userModel = model<IUser>("Users", userSchema);
export default userModel;