import { User } from "../model/user";

export class UserService {
    private users: User[] = [];

    async getCredits(id: number): Promise<number> {
        const temp = this.users.find((user) => user.user_id === id);
        return temp ? temp.amount : 0;
    }

    async addCredit(id: number, addAmount: number): Promise<boolean> {
        const temp = this.users.find((user) => user.user_id === id);
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
            }
            temp.amount -= removeAmount;
            return true;
        }
        return false;
    }

    async checkUserAvailability(id: number): Promise<boolean> {
        const temp = this.users.find((user) => user.user_id === id);
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
}