import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  getDoc,
  addDoc,
  query,
  where,
  setDoc,
  limit,
  getCountFromServer,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { fireStore, storage } from "../themes/firebase";
import deleteFolder from "../utils/DeleteFolder";

const VideoFireBase = {
  async get(age) {
    const docSnap =age?await getDocs(
      query(collection(fireStore, "Video"), where("lock", "==", true), where("check", "==", true),where("Age", "<=", age))
    ): await getDocs(
      query(collection(fireStore, "Video"), where("lock", "==", true), where("check", "==", true),where("Age", "<=", 15))
    );
    const Video = docSnap.docs.map((item) => {
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
    if (Video.length !== 0) {
      return { Video, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getad() {
    const docSnap = await getDocs(collection(fireStore, "Video"));
    const Video = docSnap.docs.map((item) => {
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
    if (Video.length !== 0) {
      return { Video, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
 async getcountvideo(){
  const coll = collection(fireStore, "Video");
  const snapshot = await getCountFromServer(coll); 
  return snapshot.data().count
 },
  async getbyuser(uid) {
    const docRef = query(
      collection(fireStore, "Video"),
      where("uid", "==", uid)
    );
    const docSnap = await getDocs(docRef);
    const Video = docSnap.docs?.map((item) => {
      return { id: item.id, ...item.data(), createTime: new Date(item.data().createTime?.toDate()).toISOString() };
    });
    if (Video.length !== 0) {
      return { Video, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async checkvideouser(uid,idseries) {
    const dc = doc(fireStore, "Video", idseries);

    const docS = await getDoc(dc);
    if (!docS.exists()) { 
      return { message: "No such document!", success: false };
    }
    const VideoData = docS.data();
    if (VideoData.uid === uid) {
      return { 
        video: { id: docS.id, ...VideoData, createTime: new Date(VideoData.createTime?.toDate()).toISOString() }, 
        success: true 
      };
  } else {
      return { message: "UID does not match!", success: false };
  }
   
  },
  async getrandom(setlimit,age) {
    const randomValue = Math.random().toFixed(2);
    const q =age? query(
      collection(fireStore, "Video"),
      where("lock", "==", true), 
      where("check", "==", true),
      where("Age", "<=", age),
      where("random", ">=", randomValue),
      limit(setlimit)):query(
        collection(fireStore, "Video"),
        where("lock", "==", true), 
        where("check", "==", true),
        where("Age", "<=", 15),
        where("random", ">=", randomValue),
        limit(setlimit)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const Video = querySnapshot.docs?.map((item) => {
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
      return { Video, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getbyid(id) {
    const docRef = doc(fireStore, "Video", id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        createTime: new Date(docSnap.data().createTime?.toDate()).toISOString(),
        success: true,
      };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  
  async getchapters(id) {
    const docRef = doc(fireStore, "Video", id);

    const docSnap = await getDoc(docRef);
    const ChaptersnRef = collection(docSnap.ref, id);
    const Chapters = await getDocs(ChaptersnRef);
    const chaps = Chapters.docs.map((item) => {
      return {
        id: item.id,
        ...item.data(),
        createTime: new Date(item.data().createTime?.toDate()).toISOString(),
      };
    });
    if (chaps.length !== 0) {
      return { chaps, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getchaptersid(id, idchap) {
    const docRef = doc(fireStore, "Video", id);

    const ChaptersnRef = collection(docRef, id);
    const docRefchap = doc(ChaptersnRef,idchap);

    const Chapters = await getDoc(docRefchap);
   
    if (Chapters.exists()) {
      return {
        ...Chapters.data(),
        createTime: new Date(Chapters.data().createTime?.toDate()).toISOString(),
        success: true,
      };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getchaptersad(id) {
    const docRef = doc(fireStore, "Video", id);

    const docSnap = await getDoc(docRef);
    const ChaptersnRef = collection(docSnap.ref, id);
    const Chapters = await getDocs(ChaptersnRef);
    const chaps = Chapters.docs.map((item) => {
      return {
        id: item.id,
        ...item.data(),
        createTime: new Date(item.data().createTime?.toDate()).toISOString(),
      };
    });
    if (chaps.length !== 0) {
      return { chaps, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getidlikechap(id,idchap,uid) {
    const parentDocRef = doc(fireStore, "Video", id);
    const repcollectionRef = collection(parentDocRef,id);
    const subrepRef=doc(repcollectionRef,idchap)
    const subcollectionRef = collection(subrepRef, "like");
    const docRef = doc(subcollectionRef, uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...docSnap.data(), success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async Addlikechap(data) {
    const parentDocRef = doc(fireStore, "Video", data.id);
    const repcollectionRef = collection(parentDocRef,data.id);
    const subrepRef=doc(repcollectionRef,data.idseries)
    const subcollectionRef = collection(subrepRef, "like");
    const docRef = doc(subcollectionRef, data.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await deleteDoc(docRef);
     

      await updateDoc(subrepRef, {
        likes: data.togglelike === 0 ? 0 : data.togglelike - 1,
      });
    } else {
      const getdata = {
        id: data.id,
        uid: data.uid,
        idrep:data.idseries,
        like: data.like,
      };
    
      await setDoc(docRef, getdata);
    

      await updateDoc(subrepRef, { likes: data.togglelike + 1 });
    }
  },
  async Add(data) {
    const docid = await addDoc(collection(fireStore, "Video"), data);
    return docid.id;
  },
  async Addep(data) {
    const parentDocRef = doc(fireStore, "Video", data.idseries);
    const subcollectionRef = collection(parentDocRef, data.idseries);

    const getdata = {
      chapterTitle: data.valueEpisodeTitle,
      uid: data.uid,
      fileURL: data.fileURL,
      likes: data.likes,
      num: data.num,
      check:data.check,
      note:data.valueNote,
      views: data.views,
      checkcomment:data.checkcomment,
      createTime: data.createTime,
    };
    const docid = await addDoc(subcollectionRef, getdata);
    return docid.id;
  },
  async update(data, id) {
    const update = doc(fireStore, "Video", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(update, data);
  },
  async updateep(data, idvideo,idchap) {
    const parentDocRef = doc(fireStore, "Video", idvideo);
    const subcollec = collection(parentDocRef, idvideo);
    const parentDoc = doc(subcollec, idchap);
    await updateDoc(parentDoc, data);
  },
  async  deletechaps( id) {
    const docRef = doc(fireStore, "Video", id);

    const docSnap = await getDoc(docRef);
    const ChaptersnRef = collection(docSnap.ref, id);
    const Chapters = await getDocs(ChaptersnRef);
    Chapters.docs.map(async (item) => {
  
      const parentDoc = doc(ChaptersnRef, item.id);
      const subcolleclike = collection(parentDoc, "like");
      const querySnapshot = await getDocs(subcolleclike);
      for (const document of querySnapshot.docs) {
        await deleteDoc(doc(document.ref.firestore, document.ref.path));
    }
      await deleteDoc(parentDoc);
    });

  },
  async Delete(id) {
    const docRef = doc(fireStore, "Video", id);

    const docSnap = await getDoc(docRef);
    await deleteDoc(doc(fireStore, "Video", id));
    await this.deletechaps(id)
    docSnap.exists && await deleteFolder(`cms_uploads/Video/episodes/${docSnap?.data().uid}/${id}`)
    docSnap.exists && await deleteFolder(`cms_uploads/Video/${docSnap?.data().uid}/${id}`)
  },
  async Deletechap(id,idchap) {
    const parentDocRef = doc(fireStore, "Video", id);
    const docSnap = await getDoc(parentDocRef);
    const subcollec = collection(parentDocRef, id);
    const parentDoc = doc(subcollec, idchap);
    const subcolleclike = collection(parentDoc, "like");
    const querySnapshot = await getDocs(subcolleclike);
    for (const document of querySnapshot.docs) {
      await deleteDoc(doc(document.ref.firestore, document.ref.path));
  }
    await deleteDoc(parentDoc);
  docSnap.exists && await deleteFolder(`cms_uploads/Video/episodes/${docSnap.data().uid}/${id}/chap/${idchap}/`)
  docSnap.exists && await deleteFolder(`cms_uploads/Video/episodes/${docSnap.data().uid}/${id}/`)


  },
  async uploadToFirebase(file, name, iduser, id, key) {
    const storageRef =ref(storage, `cms_uploads/Video/${iduser}/${id}/${name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
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
            const imageKeyMapping = {
              squareThumbnail: "squareThumbnail",
              horizontalThumbnail: "horizontalThumbnail",
            };

            const imageToUpdate = imageKeyMapping[key];
            if (imageToUpdate) {
           
                await this.update({ [imageToUpdate]: downloadUrl }, id);
            }
            resolve(downloadUrl);
          });
        }
      );
    });
    return uploadTask;
  },
  async uploadToFirebaseep(file, name, iduser, id, idchap,key) {
    const storageRef = key==="fileURL"?ref(storage, `cms_uploads/Video/episodes/${iduser}/${id}/chap/${idchap}/${name}`):ref(storage, `cms_uploads/Video/episodes/${iduser}/${id}/${idchap}/${name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
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
            const imageKeyMapping = {
              squareThumbnail: "squareThumbnail",
              horizontalThumbnail: "horizontalThumbnail",
              fileURL:"fileURL"

            };

            const imageToUpdate = imageKeyMapping[key];
            if (imageToUpdate) {
          
                await this.updateep({ [imageToUpdate]: downloadUrl }, id,idchap);
            }
            resolve(downloadUrl);
          });
        }
      );
    });
    return uploadTask;
  },
  async  deleteSubcollection(subcollectionRef, uid) {
    const q = query(subcollectionRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
  
    for (const subDoc of querySnapshot.docs) {
      await deleteDoc(doc(subDoc.ref.firestore, subDoc.ref.path));
    }
  },
 
  async deleteAccount(id) {
    const commentsRef = collection(fireStore, "Video");
    const q = query(commentsRef, where("uid", "==", id));
    const querySnapshot = await getDocs(q);
    
    for (const document of querySnapshot.docs) {
      // Xóa các subcollections 'like', 'dislike', và 'comment'
      const subcollectionRef = collection(document.ref, document.id);
    
      // Xóa tất cả tài liệu trong các subcollections
      await this.deleteSubcollection(subcollectionRef, id);
    
      // Cuối cùng, xóa tài liệu chính trong 'comments'
      await deleteDoc(doc(document.ref.firestore, document.ref.path));
  }
 await deleteFolder(`cms_uploads/Video/episodes/${id}`)
 await deleteFolder(`cms_uploads/Video/${id}`)

  }
};

export default VideoFireBase;
