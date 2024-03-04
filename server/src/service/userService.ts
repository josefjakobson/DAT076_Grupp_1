//import { ConsoleMessage } from "puppeteer";
import { User } from "../model/user";

export class UserService {
    private users: User[] = [{user_id: 1, amount: 45}];

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
    

    async addCredit(user: User|undefined, addAmount: number): Promise<boolean> {
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