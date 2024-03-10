// import * as SuperTest from "supertest";
// import { app } from "../start";
// import { User } from "../model/user";

// const request = SuperTest.default(app);

// test("Post request to /users", async () => {
//     const res = await request.post("/userRouter/users").send();
//     expect(res.body).toBeTruthy();
//     expect(res.statusCode).toEqual(200);
// })

// test("Post request to /user", async () => {
//     const res1 = await request.post("/userRouter/user").send({username: "user", password: "password"});
//     expect(res1.body).toBeTruthy();
//     expect(res1.statusCode).toEqual(200);
// });

// test("Get request to /user", async () => {
//     const res1 = await request.get("/userRouter/user").send({username: "user"});
//     expect(res1.statusCode).toEqual(200);
//     expect(res1.body.username).toEqual("user");
// });

// test("Get request to /credit", async () => {
//     const res1 = await request.get("/userRouter/credit").send({username: "user"});
//     expect(res1.statusCode).toEqual(200);
//     expect(res1.text).toEqual('0');
// });

// test("Put request to /credit that adds money", async () => {
//     const res1 = await request.put("/userRouter/credit").send({username: "user", changeAmount: 10});
//     expect(res1.statusCode).toEqual(200);
//     const res2 = await request.get("/userRouter/credit").send({username: "user"});
//     expect(res2.text).toEqual('10');
// });


// test("Get request to /users", async () => {
//     const res1 = await request.get("/userRouter/users").send({});
//     expect(res1.statusCode).toEqual(200);
//     expect(res1.body.length).toEqual(1);
// });


// test("Post request to /user + Get request to /users", async () => {
//     const res1 = await request.post("/userRouter/user").send({username: "user2", password: "password"});
//     const res2 = await request.post("/userRouter/user").send({username: "user3", password: "password"});

//     const res3 = await request.get("/userRouter/users").send({});
//     expect(res3.statusCode).toEqual(200);
//     expect(res3.body.length).toEqual(3);
// });



