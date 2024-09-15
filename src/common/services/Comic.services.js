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
  limit,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { fireStore, storage } from "../themes/firebase";

const comicFireBase = {
  async get() {
    const docSnap = await getDocs(
      query(collection(fireStore, "Comic"), where("lock", "==", true))
    );
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
  async getad() {
    const docSnap = await getDocs(collection(fireStore, "Comic"));
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
  async getrandom() {
    const randomValue = Math.random();
    const q = query(
      collection(fireStore, "Comic"),
      where("random", ">=", randomValue),
      limit(5)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const comic = querySnapshot.docs?.map((item) => {
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
      return { comic, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getbyid(id) {
    const docRef = doc(fireStore, "Comic", id);

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
    const docRef = doc(fireStore, "Comic", id);

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
  async Add(data) {
    const docid = await addDoc(collection(fireStore, "Comic"), data);
    return docid.id;
  },
  async Addep(data) {
    const parentDocRef = doc(fireStore, "Comic", data.idseries);
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
    const update = doc(fireStore, "Comic", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(update, data);
  },
  async updateep(data, idseries,idchap) {
    const parentDocRef = doc(fireStore, "Comic", idseries);
    const subcollec = collection(parentDocRef, idseries);
    const parentDoc = doc(subcollec, idchap);
    await updateDoc(parentDoc, data);
  },
  async Delete(id) {
    await deleteDoc(doc(fireStore, "Comic", id));
  },
  async uploadToFirebase(file, name, iduser, id, key) {
    const storageRef = ref(storage, `cms_uploads/comic/${iduser}/${name}`);

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
    const storageRef = ref(storage, `cms_uploads/comic/episodes/image/${iduser}/${name}`);

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
    const Ref = collection(fireStore, "Comic");
    const q = query(Ref, where("uid", "==", id)); 
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }
};

export default comicFireBase;
