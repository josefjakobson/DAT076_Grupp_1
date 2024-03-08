import { User } from "../model/user";

export interface IUserService{

    // Returns the current logged-in users 
    getUsers():Promise<User[]>;
    

    // Tries to add a user with id
    // Returns true if user was added
    // Returns false if id was already in use and user was not added
    addUser(id: number, inUsername : string, inPassword: string, credits: number):Promise<boolean>
    

    // Gets credits of some user, returns false if user not found
    getCredits(id: number | undefined):Promise<number | boolean>

    
    // Updates the credit amount of a user, returns true if successfull else returns false
    updateCredit(id: number, changeAmount: number):Promise<boolean>

}