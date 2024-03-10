import { User } from "../model/user";
import { IUserService } from "./IUserService";
import {userModel} from "../../db/user.db";


export class userDBService implements IUserService{
    async getUsers(): Promise<User[]> {
        return await userModel.find();
    }

    async getUser(inUsername: string | undefined): Promise<User | null> {
        return await userModel.findOne({ username: inUsername });
    }

    async addUser(id: number, inUsername: string, inPassword: string, credits: number = 0): Promise<boolean> {
        try{
            await userModel.create({user_id: id, username: inUsername, password: inPassword, credits});
            console.log("Service")
            return true;
        } catch (e: any) {
            console.log("addUser", e)
            return false;
        }
    }

    async deleteUser(inUsername: string): Promise<boolean> {
        try{
            await userModel.deleteOne({username: inUsername})
            return true;
        } catch (e: any) {
            console.log("deleteUser", e)
            return false;
        }
    }

    async clearUsers(): Promise<boolean>{
        try{
            const currentUsers = await this.getUsers();
            for(const user of currentUsers){
                this.deleteUser(user.username);
            }
            return true;

        } catch (e: any){
            console.log("clearUsers", e);
            return false;
        }
    }


    async getCredits(inUsername: string | undefined): Promise<number | boolean> {
        try{
            const query = await userModel.find({username: inUsername}, {_id:0, credits:1});
            const value = query.pop()?.credits;
            if(value != undefined) return value; else return false;
        } catch (e: any){
            console.log("getCredits", e);
            return false;
        }
    }
    async updateCredit(inUsername: string, changeAmount: number): Promise<boolean> {
        try{
            if (changeAmount > 0){
                const user = await userModel.updateOne(
                    { username: inUsername },
                    { $inc: { 'credits': changeAmount } },
                    { new: true } // Return the updated document
                );
                return true;
            } else {
                const user = await userModel.updateOne(
                    { username: inUsername, credits: { $gte: changeAmount } }, // Ensure enough credits are available
                    { $inc: { 'credits': changeAmount } },
                    {new: true}
                );
                return true;
            }
    
        } catch(e: any){
            console.log("updateCredit", e);
            return false;
        }
    }    
}