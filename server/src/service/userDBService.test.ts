import mongoose from "mongoose";
import { userDBService } from "./userDBService";



/*
test("Added users should show up in the database", async () => {
    const service = new userDBService();
    await service.addUser(1, "user1", "123", 10);
    await service.addUser(2, "user2", "123");
    const users = await service.getUsers();
    expect(users.length == 2).toBeTruthy();
});

test("Added users should show up in the database", async () => {
    const service = new userDBService();
    const success = await service.addUser(1, "user1", "123");
    const success2 = await service.addUser(2, "user2", "123");
    const users = await service.getUsers();
    expect(users.length == 1).toBeTruthy();
});



test("Multiple users with the same ID or username should not be possible", async () => {
    const service = new userDBService();
    await service.addUser(1, "user1", "123");
    await service.addUser(1, "user2", "123");
    await service.addUser(2, "user1", "123");
    const users = await service.getUsers();
    expect(users.length == 1).toBeTruthy();
})

test("getCredits should return the number of credits", async () =>{
    const service = new userDBService();
    await service.addUser(1, "user1", "123", 0);
    await service.addUser(2, "user2", "123", 30);
    const user1Cred = await service.getCredits(1);
    const user2Cred = await service.getCredits(2);
    expect(user1Cred == 0).toBeTruthy();
    expect(user2Cred == 30).toBeTruthy();
})

test("Adding credits to a user should update the database", async () => {
    const service = new userDBService();
    await service.updateCredit(1, 5);
    const user1Cred = await service.getCredits(1);
    expect(user1Cred == 10).toBeTruthy();
})

test("Removing credits to a user should update the database", async () => {
    const service = new userDBService();
    await service.updateCredit(1, -5);
    const user1Cred = await service.getCredits(1);
    expect(user1Cred == 5).toBeTruthy();
})*/