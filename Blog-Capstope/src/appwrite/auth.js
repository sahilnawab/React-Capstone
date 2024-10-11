
import config from "../config/config" 
import {Client,Account,ID} from "appwrite";

// this class contains the methods for user authentication 
export class AuthService{
    client = new Client();
    account;

    
    constructor(){
        this.client.setEndpoint(config.appwriteUrl);
        this.client.setProject(config.appwriteProjectId);
        this.account=new Account(this.client);   
    }
    // signup method
    async createAccount({name, email, password}) {
        console.log("Creating account with:", {name, email, password});
        const userAccount = await this.account.create(ID.unique(), email, password);
        console.log("User account created:", userAccount);
    
        if (userAccount) {
            console.log("Logging in user...");
            return this.login({email, password});
        } else {
            return userAccount;
        }
    }
    //login method
    async login({email, password}) {
    
            return await this.account.createEmailPasswordSession(email, password);
        
    }
    //get current logged in user
    async getCurruntUser(){
        return await this.account.get();
                    
    }
    //logout method
    async logout(){
        await this.account.deleteSessions();
    }
}

const authServiceInstance = new AuthService();

export default authServiceInstance; 