import { doc, getDoc, addDoc,collection, updateDoc,getDocs,where,query,deleteDoc } from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { fireStore, storage } from '../themes/firebase';
import deleteFolder from '../utils/DeleteFolder';

const privacyFireBase = {
  async getAll() {
    const docSnap = await getDocs(collection(fireStore, "privacy"));
    const  privacy = docSnap.docs.map((item) => {
      //   console.log(item.ref)
      //   const subcollectionRef = collection(item.ref, 'YZOoN8D6Ued98MSS7xEF');
      //   const subcollectionSnapshot = await getDocs(subcollectionRef)
      //   subcollectionSnapshot.forEach((chapterDoc) => {
      //     Xử lý dữ liệu từ subcollection ở đây
      //     console.log(chapterDoc.id, chapterDoc.data());
      // });
      return {
        id: item.id,
        ...item.data(),
        createTime: new Date(item.data().createTime?.toDate()).toISOString(),
      };
    });
    if ( privacy.length !== 0) {
      return {  privacy, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getAllid(id) {
    const docRef = query(
      collection(fireStore, "privacy"),
      where("uid", "==", id),
    );

    const docSnap = await getDocs(docRef);
    const privacy = docSnap.docs.map((item) => {
      return {
        idpost: item.id,
        ...item.data(),
        createTime: new Date(item.data().createTime?.toDate()).toISOString(),
      };
    });
    if (privacy.length !== 0) {
      return { privacy, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getbyid(id) {
    const docRef = doc(fireStore, 'privacy', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), success: true };
    } else {
      return { message: 'No such document!', success: false };
    }
  },
  async Add(data) {
   const docid= await addDoc(collection(fireStore, "privacy"), data);
   return docid.id
  },

  async update(data, id) {
    const updatebanner = doc(fireStore, "privacy", id);

    await updateDoc(updatebanner, data);
  },
  
    async uploadToAdd(file, name,id) {

    const storageRef = ref(storage, `cms_uploads/privacy/${id}/${name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    new Promise((resolve, reject)=>{
        uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              // console.log('Upload is ' + progress + '% done');
      
              return progress;
            },
            (error) => {
              console.log(error);
              reject(error); 
            },
            () => {
             getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
              
                  
              await this.update({ File:downloadUrl }, id);
          
                  resolve(downloadUrl); 
            
              });
            }
          );
    }) 
    return uploadTask;
  },
  async Delete(id) {
    await deleteDoc(doc(fireStore, "privacy", id));
    await deleteFolder(`cms_uploads/privacy/${id}`)

  },
 
};
export default privacyFireBase;
