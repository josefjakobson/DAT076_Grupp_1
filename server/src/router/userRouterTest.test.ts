import * as SuperTest from "supertest";
import { app } from "../start";
import { User } from "../model/user";

const request = SuperTest.default(app);


test("Post request to /user", async () => {
    const res1 = await request.post("/userRouter/user").send({username: "user", password: "password"});
    console.log(res1.body)
    expect(res1.body).toBeTruthy();
    expect(res1.statusCode).toEqual(200);
});

test("Get request to /user", async () => {
    const res1 = await request.get("/userRouter/user").send({username: "user"});
    console.log(res1.body)
    expect(res1.statusCode).toEqual(200);
    expect(res1.body.username).toEqual("user");
});

test("Get request to /credit", async () => {
    const res1 = await request.get("/userRouter/credit").send({username: "user"});
    console.log(res1.body)
    expect(res1.statusCode).toEqual(200);
    expect(res1.body.credit).toEqual(0);
});

// test("Put request to /credit that adds money", async () => {
//     const res1 = await request.put("/userRouter/credit").send({username: "user", changeAmount: 10});
//     // console.log(res1.body)
//     expect(res1.statusCode).toEqual(200);
//     // expect(res1.body.credit).toEqual(10);
// });


// test("Get request to /users", async () => {
//     const res1 = await request.get("/users").send({});
//     console.log(res1.headers, res1.statusCode);
//     expect(res1.statusCode).toEqual(200);
//     expect(res1.body).toEqual({username : "user1", password: "123"});
//     const res2 = await request.get("/user");
//     console.log(res2);
//     expect(res2.statusCode).toEqual(200);
// });



