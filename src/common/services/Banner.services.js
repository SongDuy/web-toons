import { doc, getDoc, addDoc,collection, updateDoc,getDocs,where,query,deleteDoc } from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { fireStore, storage } from '../themes/firebase';

const bannerFireBase = {
  async getAll() {
    const docSnap = await getDocs(collection(fireStore, "banner"));
    const banner = docSnap.docs.map((item) => {
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
    if (banner.length !== 0) {
      return { banner, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getAllid(id) {
    const docRef = query(
      collection(fireStore, "banner"),
      where("uid", "==", id),
    );

    const docSnap = await getDocs(docRef);
    const banner = docSnap.docs.map((item) => {
      return {
        idpost: item.id,
        ...item.data(),
        createTime: new Date(item.data().createTime?.toDate()).toISOString(),
      };
    });
    if (banner.length !== 0) {
      return { banner, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getbyid(id) {
    const docRef = doc(fireStore, 'banner', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), success: true };
    } else {
      return { message: 'No such document!', success: false };
    }
  },
  async Add(data) {
   const docid= await addDoc(collection(fireStore, "banner"), data);
   return docid.id
  },

  async update(data, id) {
    const updatebanner = doc(fireStore, "banner", id);

    await updateDoc(updatebanner, data);
  },
  async uploadToFirebase(file, name,id) {

    const storageRef = ref(storage, `cms_uploads/banner/${name}`);

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
              
                  await this.update({ image:downloadUrl }, id);
          
                  resolve(downloadUrl); 
            
              });
            }
          );
    }) 
    return uploadTask;
  },
    async uploadToAdd(file, name,data) {

    const storageRef = ref(storage, `cms_uploads/banner/${name}`);

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
              
                  
                  await this.Add({...data, image:downloadUrl });
          
                  resolve(downloadUrl); 
            
              });
            }
          );
    }) 
    return uploadTask;
  },
  async Delete(id) {
    await deleteDoc(doc(fireStore, "banner", id));
  },
 
};
export default bannerFireBase;
