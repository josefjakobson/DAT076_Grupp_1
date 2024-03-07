//import { ConsoleMessage } from "puppeteer";
import { User } from "../model/user";
import { IUserService } from "./IUserService";

export class UserService implements IUserService {
    private users: User[] = [{user_id: 1, amount: 45}];

    async getUsers(): Promise<User[]>{
        return this.users;
    }
    async checkUserAvailability(id: number): Promise<boolean> {
        const temp = this.users.find((user) => user.user_id == id);
        return (temp == undefined);
    }

    async addUser(id: number): Promise<boolean> {
        console.log(this.users)
        console.log(id)

        if ( await this.checkUserAvailability(id)) {
            const user = {
                user_id: id,
                amount : 0,
            }
            this.users.push(user)
            return true;
        }
        return false;
    }

    
    async getCredits(id: number | undefined): Promise<number | boolean> {
        console.log(this.users)
        console.log(id)
        if (id === undefined) {
            console.error("ID is undefined");
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