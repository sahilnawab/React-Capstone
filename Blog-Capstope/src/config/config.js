
// This file contains the configuration for the appwrite project, database, bucket, and collection.
// for easy access to the configuration, we have created a config object that contains the appwriteUrl, appwriteProjectId, appwriteDatabaseId, appwriteBucketId, and appwriteCollectionId.
const config={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
}

export default config;