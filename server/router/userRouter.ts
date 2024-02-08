import express, { Request, Response, Router } from "express";
import { User } from "../model/user";
import { UserService } from "../service/userService";

const userService : UserService = new UserService();

export const userRouter : Router = express.Router();

userRouter.get("/", async (
    req : Request<{id : number}>, 
    res : Response<number | String>
) => {
    try {
        const credits = await userService.getCredits(req.params.id);
        res.status(200).send(credits);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.post("/", async (
    req : Request<{id : number, addAmount : number}>, 
    res : Response<Boolean>
) => {
    try {
        const success = await userService.addCredit(req.params.id, req.params.addAmount);
        res.status(200).send(success);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.post("/", async (
    req : Request<{id : number, addAmount : number}>, 
    res : Response<Boolean>
) => {
    try {
        const success = await userService.removeCredit(req.params.id, req.params.addAmount);
        res.status(200).send(success);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
