import { doc, getDoc, addDoc,collection, updateDoc,getDocs,where,query,deleteDoc } from 'firebase/firestore';

import { fireStore } from '../themes/firebase';

const aboutFireBase = {
  async getAll() {
    const docSnap = await getDocs(collection(fireStore, "about"));
    const about = docSnap.docs.map((item) => {
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
    if (about.length !== 0) {
      return { about, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getAllid(id) {
    const docRef = query(
      collection(fireStore, "about"),
      where("uid", "==", id),
    );

    const docSnap = await getDocs(docRef);
    const banner = docSnap.docs.map((item) => {
      return {
        idpost: item.id,
        ...item.data(),
        createTime: new Date(item.data().createTime?.toDate()).toISOString(),
      };
    });
    if (banner.length !== 0) {
      return { banner, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getbyid(id) {
    const docRef = doc(fireStore, 'about', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), success: true };
    } else {
      return { message: 'No such document!', success: false };
    }
  },
  async Add(data) {
   const docid= await addDoc(collection(fireStore, "about"), data);
   return docid.id
  },

  async update(data, id) {
    const updatebanner = doc(fireStore, "about", id);

    await updateDoc(updatebanner, data);
  },
  

  async Delete(id) {
    await deleteDoc(doc(fireStore, "about", id));

  },
 
};
export default aboutFireBase;
