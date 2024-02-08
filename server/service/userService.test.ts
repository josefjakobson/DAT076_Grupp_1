import { UserService } from "./userService";

test("If a task is added to the list then it should be in the list", async () => {
    const desc = "Test description";
    const userService = new UserService();
    await userService.addUser(1)
    await userService.addCredit(1, 50);
    expect(userService.getCredits(1) == 50).toBeTruthy();
})

