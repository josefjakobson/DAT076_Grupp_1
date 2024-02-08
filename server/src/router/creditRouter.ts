/* import express, { Request, Response, Router } from "express";
import { User } from "../model/user";
import { UserService } from "../service/userService";

const taskService : UserService = new UserService();

export const creditsRouter : Router = express.Router();

creditsRouter.get("/", async (
    req : Request<{id : number}, {}>, 
    res : Response<number | String>
) => {
    try {
        const credits = await taskService.getCredits(req.id);
        res.status(200).send(credits);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

creditsRouter.post("/:id, :amount", async (
    req: Request<{}, {}>,
    res: Response<string>
) => {
    try {
        const description = req.body.description;
        if (typeof(description) !== "string") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- description has type ${typeof(description)}`);
            return;
        }
        const newTask = await taskService.addTask(description);
        res.status(201).send(newTask);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})

// Updates the amount of money
creditsRouter.patch("/:taskId", async (
    req: Request<{ taskId: string }, {}, Partial<User>>,
    res: Response<User | String>
) => {
    try {
        const { taskId } = req.params;
        const updatedTask = await taskService.addCredit(taskId, req.body);
        res.status(200).send(updatedTask);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

creditsRouter.put("/:id", async (
    req: Request<{ id: string }, {}>,
    res: Response<string>
) => {
    try {
        if (req.params.id == null) {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- missing id param`);
            return;
        }
        if (typeof (req.body.done) !== "boolean") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- field 'done' has type ${typeof(req.body.done)}`);
            return;
        }
        if (req.body.done === false) {
            res.status(405).send(`Bad PUT call to ${req.originalUrl} --- Marking tasks as not done not implemented yet`);
            return;
        }
        const index = parseInt(req.params.id, 10);
        if (! (index >= 0)) {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- id number must be a non-negative integer`);
            return;
        }
        
        const completed = await taskService.markDone(index);

        if (!completed) {
            res.status(404).send(`No task with index ${index}`)
            return;
        }
        res.status(200).send("Task set to done");

    } catch (e: any) {
        res.status(500).send(e.message);
    }
}); */