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
import { fireStore } from '../themes/firebase';
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
