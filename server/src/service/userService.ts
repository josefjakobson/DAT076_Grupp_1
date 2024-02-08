import { ConsoleMessage } from "puppeteer";
import { User } from "../model/user";

export class UserService {
    private users: User[] = [];

    async getUsers(): Promise<User[]>{
        return this.users;
    }

    async getCredits(id: number): Promise<number> {
        const temp = this.users.find((user) => user.user_id === id);
        return temp ? temp.amount : 0;
    }

    async addCredit(id: number, addAmount: number): Promise<boolean> {
        const temp = this.users.find((user) => user.user_id === id);
        console.log(this.users)
        if (temp) {
            temp.amount += addAmount;  
            return true; 
        }
        return false;
    }
    
    async removeCredit(id: number, removeAmount: number): Promise<boolean> {
        const temp = this.users.find((user) => user.user_id === id);
        if (temp) {
            if (temp.amount - removeAmount < 0) {
                return false;
            } else {
                temp.amount -= removeAmount;
                return true;
            } 
        }
        return false;
    }

    async checkUserAvailability(id: number): Promise<boolean> {
        const temp = this.users.find((user) => user.user_id == id);
        return (temp == undefined);
    }

    async addUser(id: number): Promise<boolean> {
        if ( await this.checkUserAvailability(id)) {
            const user = {
                user_id: id,
                amount : 0,
            }
            console.log(this.users)
            this.users.push(user)
            return true;
        }
        return false;
    }
}