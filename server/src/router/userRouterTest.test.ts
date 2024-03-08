import * as SuperTest from "supertest";
import { app } from "../start";
import { User } from "../model/user";

const request = SuperTest.default(app);

test("Get request to /user", async () => {
    const res1 = await request.get("/user").send({});
    console.log(res1.headers, res1.statusCode);
    expect(res1.statusCode).toEqual(200);
    expect(res1.body).toEqual({username : "user1", password: "123"});
    const res2 = await request.get("/user");
    console.log(res2);
    expect(res2.statusCode).toEqual(200);
});



