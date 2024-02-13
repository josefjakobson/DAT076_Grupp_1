/*import express, { Request, Response, Router } from "express";
import { User } from "../model/user";
import { UserService } from "../service/userService";



const creditService : UserService = new UserService();


export const creditRouter : Router = express.Router();


creditRouter.get("/", async (
    req : Request<{},{},{id : number}>, 
    res : Response<number | boolean>
) => {
    try {
        const credits = await creditService.getCredits(req.body.id);
        res.status(200).send(credits);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

creditRouter.put("/", async (
    req : Request<{},{},{id : number, changeAmount : number}>, 
    res : Response<Boolean>
) => {
    try {
        const success = await creditService.updateCredit(req.body.id, req.body.changeAmount);
        res.status(200).send(success);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})*/