//import { ConsoleMessage } from "puppeteer";
import { User } from "../model/user";

export class UserService {
    private users: User[] = [{user_id: 1, amount: 23}];

    async getUsers(): Promise<User[]>{
        return this.users;
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
            this.users.push(user)
            return true;
        }
        return false;
    }

    
    async getCredits(id: number): Promise<number|boolean> {
        console.log("here")
        const temp = this.users.find((user) => user.user_id == id);
        console.log(temp)
        return temp ? temp.amount : false;
    }

    async addCredit(user: User|undefined, addAmount: number): Promise<boolean> {
        console.log(user)
        if (user) {
            user.amount += addAmount;
            console.log(user);
            return true; 
        }
        return false;
    }

    async removeCredit(user: User|undefined, removeAmount: number): Promise<boolean> {
        if (user) {
            if (user.amount + removeAmount < 0) {
                return false;
            } else {
                user.amount += removeAmount;
                return true;
            } 
        }
        return false;
    }

    async updateCredit(id: number, changeAmount: number): Promise<boolean>{
        const temp = this.users.find((user) => user.user_id === id);
        if(changeAmount<0){
            const success = await this.removeCredit(temp, changeAmount);
            return success;
        }
        else{
            const success = await this.addCredit(temp, changeAmount);
            return success;
        }
    }
}