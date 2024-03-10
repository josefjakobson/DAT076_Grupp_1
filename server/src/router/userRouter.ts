import express, { Request, Response, Router } from "express";
import { User } from "../model/user";
import { IUserService } from "../service/IUserService";
import { userDBService } from "../service/userDBService";
import { Session } from "inspector";

const userService: IUserService = new userDBService();

export const userRouter: Router = express.Router();

userRouter.get("/users", async (
    req: Request<{}, {}, {}>,
    res: Response<User[]>
) => {
    try {
        const users = await userService.getUsers();
        res.status(200).send(users);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.post("/users", async (
    req: Request<{}, {}, {}>,
    res: Response<boolean>
) => {
    try {
        const success = await userService.clearUsers();
        res.status(200).send(success);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.get("/user", async (
    req: Request<{}, {}, {username: string | undefined}>,
    res: Response<User | null>
) => {
    try {
        const user = await userService.getUser(req.query.username as string);
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
        const credits = await userService.getCredits(req.query.username as string);
        console.log(credits.toString());
        res.status(200).send(credits.toString());
    } catch (e: any) {
        res.status(500).send(e.message);
        console.log(e);
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



interface LoginRequest extends Request{
    params : {},
    session : any,
    body : {username : string, password : string}
}
userRouter.post("/login", async (
    req : LoginRequest, 
    res : Response<boolean | string>
) => {
    try {
        if (typeof(req.body.username) !== "string" || typeof(req.body.password) !== "string"
        || req.body.username === "" || req.body.password === "") {
            res.status(400).send("Invalid username or password")
        }
        console.log(await userService.getUser(req.body.username))
        if (await userService.getUser(req.body.username) == null) {
            res.status(401).send("Username or password not found");
        }

        req.session.user = req.body.username;
        res.status(200).send(true)
        console.log(req.session.user)
    } catch (e : any) {
        res.status(500).send(e.message);
    }
})