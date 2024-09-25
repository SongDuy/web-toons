import { doc, getDoc, addDoc,collection, updateDoc,getDocs,where,query,deleteDoc } from 'firebase/firestore';

import { fireStore } from '../themes/firebase';

const BankFireBase = {
  async getAll() {
    const docSnap = await getDocs(collection(fireStore, "bank"));
    const bank = docSnap.docs.map((item) => {
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
    if (bank.length !== 0) {
      return { bank, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getAllid(id) {
    const docRef = query(
      collection(fireStore, "bank"),
      where("uid", "==", id),
    );

    const docSnap = await getDocs(docRef);
    const bank = docSnap.docs.map((item) => {
      return {
        idpost: item.id,
        ...item.data(),
        createTime: new Date(item.data().createTime?.toDate()).toISOString(),
      };
    });
    if (bank.length !== 0) {
      return { bank, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getbyid(id) {
    const docRef = doc(fireStore, 'bank', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), success: true };
    } else {
      return { message: 'No such document!', success: false };
    }
  },
  async Add(data) {
   const docid= await addDoc(collection(fireStore, "bank"), data);
   return docid.id
  },

  async update(data, id) {
    const updatebank = doc(fireStore, "bank", id);

    await updateDoc(updatebank, data);
  },
  
  async Delete(id) {
    await deleteDoc(doc(fireStore, "bank", id));
  },
 
};
export default BankFireBase;
