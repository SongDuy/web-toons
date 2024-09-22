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
const FollowFireBase = {
  async getALL() {
    const docSnap = await getDocs(collection(fireStore, "follow"));
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
  async getbyfollow(id) {
    const docRef = doc(fireStore, "follow", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getbyid(id) {
    const docRef = query(
      collection(fireStore, "follow"),
      where("uid", "==", id)
    );
    const docSnap = await getDocs(docRef);
    const follow = docSnap.docs?.map((item) => {
      return { id: item.id, ...item.data() };
    });
    if (follow.length !== 0) {
      return { follow, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getbychannel(id, idchannel) {
    const docRef = query(
      collection(fireStore, "follow"),
      where("uid", "==", id),
      where("idchannel", "==", idchannel)
    );
    const docSnap = await getDocs(docRef);
    const follow = docSnap.docs?.map((item) => {
      return { id: item.id, ...item.data() };
    });
    if (follow.length !== 0) {
      return { follow, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async Add(data, id) {
    await addDoc(collection(fireStore, "follow"), data);
  },
  async update(data, iduser) {
    const update = doc(fireStore, "follow", iduser);

    await updateDoc(update, data);
  },
  async Delete(id) {
    await deleteDoc(doc(fireStore, "follow", id));
  },
  async deleteAccount(id) {
    const Ref = collection(fireStore, "follow");
    const q = query(Ref, where("uid", "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  },
};
export default FollowFireBase;
