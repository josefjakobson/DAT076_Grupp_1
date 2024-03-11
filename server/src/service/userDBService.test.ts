import mongoose from "mongoose";
import { userDBService } from "./userDBService";

// test("Added users should show up in the database", async () => {
//     const service = new userDBService();
//     await service.addUser(1, "user1", "123", 10);
//     await service.addUser(2, "user2", "123");
//     const users = await service.getUsers();
//     expect(users.length == 2).toBeTruthy();
//     await service.deleteUser("user1");
//     await service.deleteUser("user2");
// });


// test("Multiple users with the same ID or username should not be possible", async () => {
//     const service = new userDBService();
//     await service.addUser(1, "user1", "123");
//     await service.addUser(1, "user2", "123");
//     await service.addUser(2, "user1", "123");
//     const users = await service.getUsers();
//     expect(users.length == 1).toBeTruthy();
//     await service.deleteUser("user1");
// })

// test("getCredits should return the number of credits", async () =>{
//     const service = new userDBService();
//     await service.addUser(1, "user1", "123", 0);
//     await service.addUser(2, "user2", "123", 30);
//     const user1Cred = await service.getCredits("user1");
//     const user2Cred = await service.getCredits("user2");
//     expect(user1Cred == 0).toBeTruthy();
//     expect(user2Cred == 30).toBeTruthy();
//     await service.deleteUser("user1");
//     await service.deleteUser("user2");
// })

// test("Adding credits to a user should update the database", async () => {
//     const service = new userDBService();
//     await service.addUser(1, "user1", "123", 0);
//     await service.updateCredit("user1", 10);
//     const user1Cred = await service.getCredits("user1");
//     expect(user1Cred == 10).toBeTruthy();
// })

// test("Removing credits to a user should update the database", async () => {
//     const service = new userDBService();
//     await service.updateCredit("user1", -5);
//     const user1Cred = await service.getCredits("user1");
//     expect(user1Cred == 5).toBeTruthy();
//     await service.deleteUser("user1");
// })


// test("Updating username to a user should update the database", async () => {
//     const service = new userDBService();
//     let res = await service.addUser(23, "user23", "123", 10);
//     expect(res == true).toBeTruthy();
//     await service.updateUsername("user23", "Amanda17");
//     const user = await service.getUser("Amanda17");
//     const user2 = await service.getUser("user23");
//     expect(user?.username == "Amanda17").toBeTruthy();
//     expect(user2?.username == null).toBeTruthy();
//     await service.deleteUser("Amanda17");
// })