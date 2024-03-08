import express, { Request, Response, Router } from "express";
import { User } from "../model/user";
import { UserService } from "../service/userService";
import { IUserService } from "../service/IUserService";
import { userDBService } from "../service/userDBService";

const userService: IUserService = new userDBService();

export const userRouter: Router = express.Router();

userRouter.get("/user", async (
    req: Request<{}, {}, {}>,
    res: Response<User[] | string>
) => {
    try {
        const users = await userService.getUsers();
        res.status(200).send(users);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


userRouter.post("/user", async (
    req: Request<{}, {}, {username: string, password: string }>,
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
    req: Request<{ id: string }>,
    res: Response<string | boolean>
) => {
    try {
        const id = Number(req.query.id);
        const credits = await userService.getCredits(id);
        console.log(credits);
        res.status(200).send(credits.toString());
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.put("/credit", async (
    req: Request<{}, {}, { id: number, changeAmount: number }>,
    res: Response<boolean>
) => {
    try {
        const success = await userService.updateCredit(req.body.id, req.body.changeAmount);
        res.status(200).send(success);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
