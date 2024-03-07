import {Schema, Model} from "mongoose";

import {User} from "../src/model/user";

import { conn } from "./conn";



const userSchema : Schema = new Schema({

    id : {
   
    type : Number,
   
    required : true,
   
    unique: true
   
    },
   
    credits : {
   
    type : Number,
   
    required : true
   
    },
});


export const userModel = conn.model<User>("gamble", userSchema);
