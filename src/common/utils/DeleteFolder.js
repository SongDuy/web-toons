import { ref,listAll, deleteObject } from "firebase/storage";
import { storage } from "../themes/firebase";
 const deleteFolder = async (folderPath)=>  {
  const folderRef = ref(storage, folderPath);

  try {
    // Liệt kê tất cả các tệp và thư mục con trong thư mục hiện tại
    const result = await listAll(folderRef);

    // Xóa tất cả các tệp trong thư mục hiện tại
    const deleteFilesPromises = result.items.map((fileRef) => deleteObject(fileRef));

    // Đệ quy xóa các thư mục con (nếu có)
    const deleteFoldersPromises = result.prefixes.map((folderRef) =>
    deleteFolder(folderRef.fullPath)
    );

    // Chờ xóa tất cả tệp và thư mục con
    await Promise.all([...deleteFilesPromises, ...deleteFoldersPromises]);

  } catch (error) {
    console.error(`Error deleting folder ${folderPath}:`, error);
  }
  }
  export default deleteFolder;
