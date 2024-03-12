import express, { Request, Response, Router } from "express";
import { User } from "../model/user";
import { IUserService } from "../service/IUserService";
import { userDBService } from "../service/userDBService";

const userService: IUserService = new userDBService();

export const userRouter: Router = express.Router();

userRouter.get("/users", async (
    req: Request<{}, {}, {}>,
    res: Response<User[]>
) => {
    try {
        const users = await userService.getUsers();
        console.log("here")

        res.status(200).send(users);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


//  FOR TESTING PURPOSES
// userRouter.post("/users", async (
//     req: Request<{}, {}, {}>,
//     res: Response<boolean>
// ) => {
//     try {
//         const success = await userService.clearUsers();
//         res.status(200).send(success);
//     } catch (e: any) {
//         res.status(500).send(e.message);
//     }
// });

userRouter.get("/user", async (
    req: Request<{}, {}, {username: string | undefined}>,
    res: Response<User | null>
) => {
    try {
        const user = await userService.getUser(req.body.username as string);
        res.status(200).send(user);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.get("/currentUser", async (
    req: any,
    res: Response<User | null>
) => {
    try {
        console.log(req.session.user.username)
        console.log("here")
        const user = await userService.getUser(req.session.user.username as string);
        res.status(200).send(user);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

interface UpdateUsernameRequest extends Request {
    params : {},
    session : any,
    body : {newUsername : string }
}

userRouter.put("/updateUsername", async (
    req: UpdateUsernameRequest,
    res: Response<boolean | null>
) => {
    try {
        const user = await userService.updateUsername(req.session.user.username, req.body.newUsername);
        req.session.user.username = req.body.newUsername;
        res.status(200).send(true);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

interface UpdatePasswordRequest extends Request {
    params : {},
    session : any,
    body : {newPassword : string }
}

userRouter.put("/updatePassword", async (
    req: UpdatePasswordRequest,
    res: Response<boolean | null>
) => {
    try {
        const user = await userService.updatePassword(req.session.user.username, req.body.newPassword);
        res.status(200).send(true);
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
    req: any,
    res: Response<string | boolean>
) => {
    try {
        const credits = await userService.getCredits(req.session.user.username as string);
        res.status(200).send(credits.toString());
    } catch (e: any) {
        res.status(500).send(e.message);
        console.log(e);
    }
});


userRouter.put("/credit", async (
    req: any,
    res: Response<boolean>
) => {
    try {
        const success = await userService.updateCredit(req.session.user.username, req.body.changeAmount);
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
            res.status(400).send("Invalid username or password");
            return;
        }
        let user = await userService.getUser(req.body.username)
        if (user?.username == null || user.password == null) {
            res.status(401).send("Username or password not found");
            return;
        }

        if (user?.username != req.body.username || user?.password != req.body.password) {
            res.status(403).send("Username or password is incorrect");
            return;
        }

        req.session.user = { username: req.body.username };
        res.status(200).send(true)    

    } catch (e : any) {
        res.status(500).send(e.message);
    }
})


userRouter.put("/logout", async (
    req: any, 
    res : Response<boolean>
) => {
    req.session.user = undefined;
    res.status(200).send(true)    
})