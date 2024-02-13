/* le comment
import { ConsoleMessage } from "puppeteer";
import { User } from "../model/user";
import { UserService } from "./userService";

export class CreditService {
    users : User[]
    constructor(users : User[]) {
        this.users = users;
    }
    
    // async getCredits(id: number, ): Promise<number> {
    //     const temp = this.users.find((user) => user.user_id === id);
    //     return temp ? temp.amount : 0;
    // }

    // async addCredit(user: User|undefined, addAmount: number): Promise<boolean> {
    //     if (user) {
    //         user.amount += addAmount;
    //         return true; 
    //     }
    //     return false;
    // }

    // async removeCredit(user: User|undefined, removeAmount: number): Promise<boolean> {
    //     if (user) {
    //         if (user.amount + removeAmount < 0) {
    //             return false;
    //         } else {
    //             user.amount += removeAmount;
    //             return true;
    //         } 
    //     }
    //     return false;
    // }

    // async updateCredit(id: number, changeAmount: number): Promise<boolean>{
    //     const temp = this.users.find((user) => user.user_id === id);
    //     if(changeAmount<0){
    //         return this.removeCredit(temp, changeAmount);
    //     }
    //     else{
    //         return this.addCredit(temp, changeAmount);
    //     }
    // }
}

*/