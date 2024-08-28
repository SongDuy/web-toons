import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
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
    const updatesetting = doc(fireStore, 'Users', iduser);

    await updateDoc(updatesetting, data);
  },
};
export default userFireBase;
