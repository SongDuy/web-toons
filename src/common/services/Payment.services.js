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
    getCountFromServer
  } from "firebase/firestore";
  import { fireStore } from "../themes/firebase";
  
  const PaymentFireBase = {
    async get(age) {
      const docSnap =age?await getDocs(
        query(collection(fireStore, "payment"), where("lock", "==", true), where("check", "==", true),where("Age", "<=", age))
      ): await getDocs(
        query(collection(fireStore, "payment"), where("lock", "==", true), where("check", "==", true),where("Age", "<=", 15))
      );
      const payment = docSnap.docs.map((item) => {
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
      if (payment.length !== 0) {
        return { payment, success: true };
      } else {
        return { message: "No such document!", success: false };
      }
    },
    async getad() {
      const docSnap = await getDocs(collection(fireStore, "payment"));
      const payment = docSnap.docs.map((item) => {
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
      if (payment.length !== 0) {
        return { payment, success: true };
      } else {
        return { message: "No such document!", success: false };
      }
    },
    async getcountpayments(){
      const coll = collection(fireStore, "payment");
      const snapshot = await getCountFromServer(coll); 
      return snapshot.data().count
     },
    async getbyuser(uid,idseries) {
      const docRef = query(
        collection(fireStore, "payment"),
        where("uid", "==", uid),
        where("idseries", "==", idseries)

      );
      const docSnap = await getDocs(docRef);
      const payment = docSnap.docs?.map((item) => {
        return { id: item.id, ...item.data(), createTime: new Date(item.data().createTime?.toDate()).toISOString() };
      });
      if (payment.length !== 0) {
        return { payment, success: true };
      } else {
        return { message: "No such document!", success: false };
      }
    },
    
    async getbyid(id) {
      const docRef = doc(fireStore, "payment", id);
  
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
  
   
    async Add(data) {
      const docid = await addDoc(collection(fireStore, "payment"), data);
      return docid.id;
    },
   
    async update(data, id) {
      const update = doc(fireStore, "payment", id);
  
      // Set the "capital" field of the city 'DC'
      await updateDoc(update, data);
    },
   
    async Delete(id) {
      await deleteDoc(doc(fireStore, "payment", id));
    },
    async DeleteVideo(id) {
      const Ref = collection(fireStore, "payment");
      const q = query(Ref, where("idseries", "==", id)); 
    
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    },
  
    async deleteAccount(id) {
      const Ref = collection(fireStore, "payment");
      const q = query(Ref, where("uid", "==", id)); 
    
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    }
  };
  
  export default PaymentFireBase;
  