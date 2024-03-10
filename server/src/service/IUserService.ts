import { User } from "../model/user";

export interface IUserService{

    // Returns the users
    getUsers():Promise<User[]>;
    
    // Returns the current logged-in user
    getUser(inUsername : string):Promise<User | null>;

    // Tries to add a user with id
    // Returns true if user was added
    // Returns false if id was already in use and user was not added
    addUser(id: number, inUsername : string, inPassword: string, credits: number):Promise<boolean>

    // Tries to delete a user with username
    // Returns true if user was deleted
    // Returns false if user was not deleted
    deleteUser(inUsername : string):Promise<boolean>

    // Tries to clear all users from database
    // Returns true if successfull, otherwise false
    clearUsers():Promise<boolean>
    
    // Gets credits of some user, returns false if user not found
    getCredits(inUsername: string | undefined):Promise<number | boolean>

    
    // Updates the credit amount of a user, returns true if successfull else returns false
    updateCredit(inUsername: string, changeAmount: number):Promise<boolean>

}