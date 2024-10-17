import { doc, getDoc, addDoc,collection, updateDoc,getDocs,where,query,deleteDoc,setDoc } from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';
import { fireStore, storage } from '../themes/firebase';
import deleteFolder from '../utils/DeleteFolder';

const postFireBase = {
  async getAll() {
    const docSnap = await getDocs(collection(fireStore, "post"));
    const comic = docSnap.docs.map((item) => {
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
    if (comic.length !== 0) {
      return { comic, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getAllid(id) {
    const docRef = query(
      collection(fireStore, "post"),
      where("uid", "==", id),
    );

    const docSnap = await getDocs(docRef);
    const post = docSnap.docs.map((item) => {
      return {
        idpost: item.id,
        ...item.data(),
        createTime: new Date(item.data().createTime?.toDate()).toISOString(),
      };
    });
    if (post.length !== 0) {
      return { post, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getbyid(id) {
    const docRef = doc(fireStore, 'post', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), success: true };
    } else {
      return { message: 'No such document!', success: false };
    }
  },
  async Add(data) {
   const docid= await addDoc(collection(fireStore, "post"), data);
   return docid.id
  },
  async getlike(id){
    const docSnap = await getDocs(collection(fireStore, "post"));
    const post =await Promise.all( docSnap.docs.map(async (item) => {
      const parentDocRef = doc(fireStore, "post", item.id);
    const subcollectionRef = collection(parentDocRef, "like");
    const docRef = doc(subcollectionRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: item.id,
        ...item.data(),
        ...docSnap.data(),
        createTime: new Date(item.data().createTime?.toDate()).toISOString(),
        success: true 
      };

    } else {
      return { message: "No such document!", success: false };
    }
     
    }));
    if (post.length !== 0) {
      return { post, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
   
  },
  async Addlike(data) {
    const parentDocRef = doc(fireStore, "post", data.idpost);
    const subcollectionRef = collection(parentDocRef, "like");
    const docRef = doc(subcollectionRef, data.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await deleteDoc(docRef);
      await updateDoc(parentDocRef, {
        like: data.togglelike === 0 ? 0 : data.togglelike - 1,
      });
    } else {
      const getdata = {
        idpost: data.idpost,
        uid: data.uid,
        like: data.like,
      };
      await setDoc(docRef, getdata);

      await updateDoc(parentDocRef, { like: data.togglelike + 1 });

    }
  },
  async updatecertification(data, id) {
    const washingtonRef = doc(fireStore, 'post', id);

    await updateDoc(washingtonRef, data);
  },
  async uploadToFirebase(file, name, iduser,id) {

    const storageRef = ref(storage, `cms_uploads/post/${iduser}/${id}/${name}`);

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
              
                  const get=await this.getbyid(id)
                  console.log(get)
                  get.success && await this.updatecertification({ image:[...get.image, downloadUrl] }, id);
          
                  resolve(downloadUrl); 
            
              });
            }
          );
    }) 
    return uploadTask;
  },
  async  deleteSubcollectionALL(subcollectionRef) {
  
    const querySnapshot = await getDocs(subcollectionRef);
  
    for (const subDoc of querySnapshot.docs) {
      await deleteDoc(doc(subDoc.ref.firestore, subDoc.ref.path));
    }
  },

  async Delete(id) {
    const docRef = doc(fireStore, "post", id);
    const subcollectionRef = collection(docRef, id);
    const subcollectionLike = collection(docRef, "like");
       await this.deleteSubcollectionALL(subcollectionRef);
    await this.deleteSubcollectionALL(subcollectionLike);
  
    // // Cuối cùng, xóa tài liệu chính trong 'comments'
    // await deleteDoc(doc(document.ref.firestore, document.ref.path));

    await deleteDoc(doc(fireStore, "post", id));
  },

  async  deleteSubcollection(subcollectionRef, uid) {
    const q = query(subcollectionRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
  
    for (const subDoc of querySnapshot.docs) {
      await deleteDoc(doc(subDoc.ref.firestore, subDoc.ref.path));
    }
  },
  async deleteAccount(id) {
    const commentsRef = collection(fireStore, "post");
    const q = query(commentsRef, where("uid", "==", id));
    const querySnapshot = await getDocs(q);
    
    for (const document of querySnapshot.docs) {
      // Xóa các subcollections 'like', 'dislike', và 'comment'
      const subcollectionRef = collection(document.ref, "like");
    
      // Xóa tất cả tài liệu trong các subcollections
      await this.deleteSubcollection(subcollectionRef, id);
    
      // Cuối cùng, xóa tài liệu chính trong 'comments'
      await deleteDoc(doc(document.ref.firestore, document.ref.path));
  }
  await deleteFolder(`cms_uploads/post/${id}/`)
  }
};
export default postFireBase;
