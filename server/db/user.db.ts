import {Schema, Model} from "mongoose";

import {User} from "../src/model/user";

import { conn } from "./conn";



const userSchema : Schema = new Schema({

    id : {
        type : Number,
        required : true,
        unique: true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        unique : false
    },
    credits : {
        type : Number,
        required : true
    },
});


export const userModel = conn.model<User>("gamble", userSchema);
