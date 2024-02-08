import { UserService } from "./userService";

test("Added credits should be saved within the user object", async () => {
    const userService = new UserService();
    userService.addUser(1);
    await userService.addCredit(1, 50);
    const userCredits = await userService.getCredits(1);
    expect(userCredits == 50).toBeTruthy();
});


/*test("If a user is added it should be in the list", async () => {
    const userService = new UserService();
    userService.addUser(1);
    expect((await userService.getUsers()).length == 1).toBeTruthy();
    userService.addUser(2);
    userService.addUser(3);
    expect((await userService.getUsers()).length == 3).toBeTruthy();
});


test("Removed credits should be removed from user object", async () => {
    const userService = new UserService();
    userService.addUser(1);
    await userService.addCredit(1, 50);
    await userService.removeCredit(1, 25);
    const userCredits = await userService.getCredits(1);
    expect(userCredits == 25).toBeTruthy();
});

test("Removing credits from user with no credits should not be possible", async () => {
    const userService = new UserService();
    userService.addUser(1);
    await userService.addCredit(1, 50);
    await userService.removeCredit(1, 51);
    const userCredits = await userService.getCredits(1);
    expect(userCredits == 50).toBeTruthy();
});

test("checkUserAvailibility should check if a user ID is already in use or not", async () => {
    const userService = new UserService();
    const user1Available = await userService.checkUserAvailability(1);
    expect(user1Available).toBeTruthy();
})


test("Users must have unique ID's", async () => {
    const userService = new UserService();
    await userService.addUser(1);
    await userService.addUser(1);
    expect((await userService.getUsers()).length == 1).toBeTruthy();
    await userService.addUser(2);
    expect((await userService.getUsers()).length == 2).toBeTruthy();

})*/
