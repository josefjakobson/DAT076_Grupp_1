import { User } from "../model/user";
import { IUserService } from "./IUserService";
import {userModel} from "../../db/user.db";


export class userDBService implements IUserService{
    async getUsers(): Promise<User[]> {
        return await userModel.find();
    }

    async addUser(id: number, inUsername: string, inPassword: string, credits: number = 0): Promise<boolean> {
        try{
            await userModel.create({user_id: id, username: inUsername, password: inPassword, credits});
            return true;
        } catch (e: any) {
            //console.log(e)
            return false;
        }
    }
    async getCredits(id: number | undefined): Promise<number | boolean> {
        try{
            const query = await userModel.find({user_id:id}, {_id:0, credits:1});
            const value = query.pop()?.credits;
            if(value) return value; else return false;
        } catch (e: any){
            return false;
        }
    }
    async updateCredit(id: number, changeAmount: number): Promise<boolean> {
        try{
            if (changeAmount > 0){
                const user = await userModel.updateOne(
                    { user_id: id },
                    { $inc: { 'credits': changeAmount } },
                    { new: true } // Return the updated document
                );
                console.log(user)
                return true;
            } else {
                const user = await userModel.updateOne(
                    { user_id: id, credits: { $gte: changeAmount } }, // Ensure enough credits are available
                    { $inc: { 'credits': changeAmount } },
                    {new: true}
                );
                return true;
            }
    
        } catch(e: any){
            console.log(e);
            return false;
        }
    }    
}