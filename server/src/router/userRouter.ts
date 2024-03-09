import express, { Request, Response, Router } from "express";
import { User } from "../model/user";
import { IUserService } from "../service/IUserService";
import { userDBService } from "../service/userDBService";

const userService: IUserService = new userDBService();

export const userRouter: Router = express.Router();

userRouter.get("/users", async (
    req: Request<{}, {}, {username: string}>,
    res: Response<User[]>
) => {
    try {
        const users = await userService.getUsers();
        res.status(200).send(users);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.get("/user", async (
    req: Request<{}, {}, {username: string}>,
    res: Response<User | null>
) => {
    try {
        const user = await userService.getUser(req.body.username);
        res.status(200).send(user);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.post("/user", async (
    req: Request<{}, {}, {username: string, password: string}>,
    res: Response<boolean>
) => {
    try {
        const users = await userService.getUsers();
        let id = users.length + 1;
        const success = await userService.addUser(id, req.body.username, req.body.password, 0);
        res.status(200).send(success);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.get("/credit", async (
    req: Request<{ username: string }>,
    res: Response<string | boolean>
) => {
    try {
        const credits = await userService.getCredits(req.body.username);
        res.status(200).send(credits.toString());
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.put("/credit", async (
    req: Request<{}, {}, { username: string, changeAmount: number }>,
    res: Response<boolean>
) => {
    try {
        const success = await userService.updateCredit(req.body.username, req.body.changeAmount);
        res.status(200).send(success);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
