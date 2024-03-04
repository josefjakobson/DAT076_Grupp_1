import express, { Request, Response, Router } from "express";
import { User } from "../model/user";
import { UserService } from "../service/userService";

const userService : UserService = new UserService();

export const userRouter : Router = express.Router();

userRouter.get("/user", async (
    req : Request<{},{},{}>, 
    res : Response<User[] | String>
) => {
    try {
        const users = await userService.getUsers();
        res.status(200).send(users);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.post("/user", async (
    req : Request<{},{},{id : number}>, 
    res : Response<Boolean>
) => {
    try {
        const success = await userService.addUser(req.body.id);
        res.status(200).send(success);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.get("/credit", async (
    req : Request<{},{},{id : number}>, 
    res : Response<string | boolean>
) => {
    try {
        const credits = await userService.getCredits(req.body.id);
        console.log(credits);
        res.status(200).send(credits.toString());
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.put("/credit", async (
    req : Request<{},{},{id : number, changeAmount : number}>, 
    res : Response<Boolean>
) => {
    try {
        const success = await userService.updateCredit(req.body.id, req.body.changeAmount);
        res.status(200).send(success);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
