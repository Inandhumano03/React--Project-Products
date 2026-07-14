import { storage } from "../appwrite/config";
import { ID } from "appwrite";

export const uploadImage = async (file) => {
  if (!file) return null;

  const uploadResponse = await storage.createFile(
    import.meta.env.VITE_APPWRITE_BUCKET_ID,
    ID.unique(),
    file
  );

  return `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${
    import.meta.env.VITE_APPWRITE_BUCKET_ID
  }/files/${uploadResponse.$id}/view?project=${
    import.meta.env.VITE_APPWRITE_PROJECT_ID
  }`;
};