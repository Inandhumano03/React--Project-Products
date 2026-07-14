import { Client, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const storage = new Storage(client);

export const uploadImage = async (file) => {

    const uploadedFile = await storage.createFile(
        "YOUR_BUCKET_ID",
        ID.unique(),
        file
    );

    return uploadedFile;
};