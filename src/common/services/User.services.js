import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  deleteDoc
} from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { fireStore,storage } from '../themes/firebase';
const userFireBase = {
  async getALL() {
    const docSnap = await getDocs(collection(fireStore, 'Users'));
    return docSnap;
  },
  async getbyid(iduser) {
    const docRef = doc(fireStore, 'Users', iduser);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), success: true };
    } else {
      return { message: 'No such document!', success: false };
    }
  },
  async Add(data, iduser) {
    await setDoc(doc(fireStore, 'Users', iduser), data);
  },
  async update(data, iduser) {
    const update= doc(fireStore, 'Users', iduser);

    await updateDoc(update, data);
  },
  async uploadToFirebase(file, name, iduser) {

    const storageRef = ref(storage, `cms_uploads/image/${iduser}/${name}`);

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
              
                 
                 await this.update({ image: downloadUrl }, iduser);
          
                  resolve(downloadUrl); 
            
              });
            }
          );
    }) 
    return uploadTask;
  },
  async deleteAccount(id) {
    const Ref = collection(fireStore, "Users");
    const q = query(Ref, where("uid", "==", id)); 
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }
};
export default userFireBase;
