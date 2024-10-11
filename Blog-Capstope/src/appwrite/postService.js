import config from "../config/config" 
import {Client,Databases,Query} from "appwrite";


export class PostService{

    client = new Client();
    database;
   


    constructor(){
        this.client.setEndpoint(config.appwriteUrl);
        this.client.setProject(config.appwriteProjectId);
        this.database=new Databases(this.client);
       
    }



// these are the methods for the storage service with backend appwrite 
//read more about the storage service here https://appwrite.io/docs/references/cloud/client-web/databases


    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            //create a new document in the collection for the post
            return await this.database.createDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug,
                {title,content,featuredImage,status,userId}
            )
        } catch (error) {
            console.log("error occured while creating post", error);
        }

    }
    async updatePost(slug,{title,content,featuredImage,status,userId}){
        try {
            return await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,content,featuredImage,status,userId
                }
            )

        } catch (error) {
            console.log("error occured while updating post", error);
        }
    }

    async deletepost(slug){
        try {
             await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("error occured while deleting post", error);
            return false;
        }
    }
    //get all posts which are active 
    async getAllActivePosts(){
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [
                    Query.equal("status","active")  
                ]
            )
        } catch (error) {
            console.log("error occured while fetching posts", error);
        }
    }
    async getPost(slug){
        try {
            return this.database.getDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug)

        } catch (error) {
            console.log("error occured while fetching post", error);
        }
    }




}

const postService = new PostService();
export default postService;