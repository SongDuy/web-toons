import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  where,
  query,
  deleteDoc,
} from "firebase/firestore";
import { fireStore } from "../themes/firebase";
const SubscribeFireBase = {
  async getALL() {
    const docSnap = await getDocs(collection(fireStore, "subscribe"));
    const subscribe = docSnap.docs.map((item) => {
      //   console.log(item.ref)
      //   const subcollectionRef = collection(item.ref, 'YZOoN8D6Ued98MSS7xEF');
      //   const subcollectionSnapshot = await getDocs(subcollectionRef)
      //   subcollectionSnapshot.forEach((chapterDoc) => {
      //     Xử lý dữ liệu từ subcollection ở đây
      //     console.log(chapterDoc.id, chapterDoc.data());
      // });
      return { id: item.id, ...item.data() };
    });
    if (subscribe.length !== 0) {
      return { subscribe, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getbysub(id) {
    const docRef = doc(fireStore, "subscribe", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getbyid(id) {
    const docRef = query(
      collection(fireStore, "subscribe"),
      where("uid", "==", id)
    );
    const docSnap = await getDocs(docRef);
    const subscribe = docSnap.docs?.map((item) => {
      return { id: item.id, ...item.data() };
    });
    if (subscribe.length !== 0) {
      return { subscribe, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getbycomic(id, idcomic) {
    const docRef = query(
      collection(fireStore, "subscribe"),
      where("uid", "==", id),
      where("idcomic", "==", idcomic)
    );
    const docSnap = await getDocs(docRef);
    const subscribe = docSnap.docs?.map((item) => {
      return { id: item.id, ...item.data() };
    });
    if (subscribe.length !== 0) {
      return { subscribe, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getbyvideo(id, idvideo) {
    const docRef = query(
      collection(fireStore, "subscribe"),
      where("uid", "==", id),
      where("idvideo", "==", idvideo)
    );
    const docSnap = await getDocs(docRef);
    const subscribe = docSnap.docs?.map((item) => {
      return { id: item.id, ...item.data() };
    });
    if (subscribe.length !== 0) {
      return { subscribe, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },

  async Add(data, id) {
    await addDoc(collection(fireStore, "subscribe"), data);
  },
  async update(data, iduser) {
    const update = doc(fireStore, "subscribe", iduser);

    await updateDoc(update, data);
  },
  async DeleteComic(id) {
    const Ref = collection(fireStore, "subscribe");
    const q = query(Ref, where("idcomic", "==", id)); 
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  },
  async DeleteVideo(id) {
    const Ref = collection(fireStore, "subscribe");
    const q = query(Ref, where("idvideo", "==", id)); 
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  },
  async Delete(id) {
    await deleteDoc(doc(fireStore, "subscribe", id));
  },
  async deleteAccount(id) {
    const Ref = collection(fireStore, "subscribe");
    const q = query(Ref, where("uid", "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  },
};
export default SubscribeFireBase;
