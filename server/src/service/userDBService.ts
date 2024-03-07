import { User } from "../model/user";
import { IUserService } from "./IUserService";
import {userModel} from "../../db/user.db";


class userDBService implements IUserService{
    async getUsers(): Promise<User[]> {
        return await userModel.find();
    }
    
    async addUser(id: number, inUsername: string, inPassword: string): Promise<boolean> {
        try{
            await userModel.create({user_id: id, username: inUsername, password: inPassword, amount: 0});
            return true;
        } catch (e: any) {
            return false;
        }
    }
    async getCredits(id: number | undefined): Promise<number | boolean> {
        try{
            const query = await userModel.find().$where('this.id = id');
            return Number(query);
        } catch (e: any){
            return false;
        }
    }
    async updateCredit(id: number, changeAmount: number): Promise<boolean> {
        try{
            if (changeAmount > 0){
                const user = userModel.findOneAndUpdate(
                    { id: id },
                    { $inc: { credits: changeAmount } },
                    { new: true } // Return the updated document
                );
                return true;
            } else {
                const user = await userModel.findOneAndUpdate(
                    { id: id, credits: { $gte: changeAmount } }, // Ensure enough credits are available
                    { $inc: { credits: changeAmount } },
                    { new: true } // Return the updated document
                );
                return true;
            }
    
        } catch(e: any){
            return false;
        }
    }    
}