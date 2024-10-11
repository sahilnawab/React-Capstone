import config from "../config/config" 
import {Client,Storage,ID} from "appwrite";


export class FileService{

    client = new Client();
    storage;


    constructor(){
        this.client.setEndpoint(config.appwriteUrl);
        this.client.setProject(config.appwriteProjectId);
        this.storage=new Storage(this.client);
    }
// these are the methods for the image storage service with backend appwrite
    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("error occured while uploading file", error);
        }

    }
    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("error occured while deleting file", error);
            return false;
        }
    }
     getFilePreview(fileId){
        return this.storage.getFilePreview(config.appwriteBucketId,fileId);
    }
    
}
// create an instance of the FileService class
const fileService =new FileService();
//export the instance
export default fileService;