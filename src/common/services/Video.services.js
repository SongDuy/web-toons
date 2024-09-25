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
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { fireStore, storage } from "../themes/firebase";

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
    const docRef = query(
      collection(docS.ref,idseries),
      where("uid", "==", uid)    
      );
    const docSnap = await getDocs(docRef);
    const video = docSnap.docs?.map((item) => {
      return { id: item.id, ...item.data(), createTime: new Date(item.data().createTime?.toDate()).toISOString() };
    });
    if (video.length !== 0) {
      return { video, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getrandom(setlimit,age) {
    const randomValue = Math.random();
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
    const Chapters = await getDocs(query(
      ChaptersnRef,
      where("check", "==", true)));
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
  async Delete(id) {
    await deleteDoc(doc(fireStore, "Video", id));
  },
  async Deletechap(id,idchap) {
    const parentDocRef = doc(fireStore, "Video", id);
    const subcollec = collection(parentDocRef, id);
    const parentDoc = doc(subcollec, idchap);
    await deleteDoc(parentDoc);
  },
  async uploadToFirebase(file, name, iduser, id, key) {
    const storageRef =ref(storage, `cms_uploads/Video/${iduser}/${name}`);

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
    const storageRef = key==="fileURL"?ref(storage, `cms_uploads/Video/episodes/${iduser}/${id}/chap/${idchap}/${name}`):ref(storage, `cms_uploads/Video/${iduser}/${name}`);

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
  async deleteAccount(id) {
    const Ref = collection(fireStore, "Video");
    const q = query(Ref, where("uid", "==", id)); 
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }
};

export default VideoFireBase;
