//import { ConsoleMessage } from "puppeteer";
import { User } from "../model/user";
import { IUserService } from "./IUserService";

export class UserService implements IUserService {
    private users: User[] = [{user_id: 1, username: "a1", password:"23", amount: 45}];

    async getUsers(): Promise<User[]>{
        return this.users;
    }
    async checkUserAvailability(username: string): Promise<boolean> {
        const temp = this.users.find((user) => user.username == username);
        return (temp == undefined);
    }

    async addUser(id: number, inUsername : string, inPassword: string): Promise<boolean> {
        console.log(this.users)
        console.log(id)

        if ( await this.checkUserAvailability(inUsername)) {
            const user = {
                user_id: id,
                username: inUsername,
                password: inPassword,
                amount : 0,
            }
            this.users.push(user)
            return true;
        }
        return false;
    }

    
    async getCredits(id: number | undefined): Promise<number | boolean> {
        if (id === undefined) {
            console.error("usernaem is undefined");
            return false;
        }
        const user = this.users.find((user) => user.user_id === id);
        if (!user) {
            console.error("User not found");
            return false;
        }
        return user.amount;
    }
    
    async updateCredit(id: number, changeAmount: number): Promise<boolean>{
        const temp = this.users.find((user) => user.user_id === id);
        if(temp){
            if(changeAmount<0 && changeAmount > temp.amount) return false
            temp.amount += changeAmount;
            return true;
        } else return false;

    }
}