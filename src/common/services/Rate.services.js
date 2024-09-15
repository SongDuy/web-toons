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
const RateFireBase = {
  async getALL() {
    const docSnap = await getDocs(collection(fireStore, "rate"));
    const rate = docSnap.docs.map((item) => {
      //   console.log(item.ref)
      //   const subcollectionRef = collection(item.ref, 'YZOoN8D6Ued98MSS7xEF');
      //   const subcollectionSnapshot = await getDocs(subcollectionRef)
      //   subcollectionSnapshot.forEach((chapterDoc) => {
      //     Xử lý dữ liệu từ subcollection ở đây
      //     console.log(chapterDoc.id, chapterDoc.data());
      // });
      return { id: item.id, ...item.data() };
    });
    if (rate.length !== 0) {
      return { rate, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getbysub(id) {
    const docRef = doc(fireStore, "rate", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getbyid(id,idcomic) {
    const docRef = query(
      collection(fireStore, "rate"),
      where("uid", "==", id),
      where("idcomic", "==", idcomic)
    );
    const docSnap = await getDocs(docRef);
    const rate = docSnap.docs?.map((item) => {
      return { id: item.id, ...item.data() };
    });
    if (rate.length !== 0) {
      return { rate, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getbycomic(idcomic) {
    const docRef = query(
      collection(fireStore, "rate"),
      where("idcomic", "==", idcomic)
    );
    const docSnap = await getDocs(docRef);
    const rate = docSnap.docs?.map((item) => {
      return { id: item.id, ...item.data() };
    });
    if (rate.length !== 0) {
      return { rate, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },

  async Add(data) {
    await addDoc(collection(fireStore, "rate"), data);
  },
  async update(data, iduser) {
    const update = doc(fireStore, "rate", iduser);

    await updateDoc(update, data);
  },
  async Delete(id) {
    await deleteDoc(doc(fireStore, "rate", id));
  },
  async deleteAccount(id) {
    const Ref = collection(fireStore, "rate");
    const q = query(Ref, where("uid", "==", id)); 
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }
};
export default RateFireBase;
