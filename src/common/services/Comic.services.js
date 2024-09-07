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
    orderBy,
    limit,
  } from 'firebase/firestore';
import { fireStore } from '../themes/firebase';

  const comicFireBase = {
    async get() {
        const docSnap = await getDocs(query(
          collection(fireStore, 'Comic'),
          where('lock','==',true)
        ));
        const comic = docSnap.docs.map((item) => {
        //   console.log(item.ref)
        //   const subcollectionRef = collection(item.ref, 'YZOoN8D6Ued98MSS7xEF');
        //   const subcollectionSnapshot = await getDocs(subcollectionRef)
        //   subcollectionSnapshot.forEach((chapterDoc) => {
        //     Xử lý dữ liệu từ subcollection ở đây
        //     console.log(chapterDoc.id, chapterDoc.data());
        // });
          return { id: item.id, ...item.data(),createTime: new Date(item.data().createTime?.toDate()).toISOString() };
          
        });
        if (comic.length !== 0) {
          return {comic, success: true };
        } else {
          return { message: 'No such document!', success: false };
        }
      },
      async getad() {
        const docSnap = await getDocs(collection(fireStore, 'Comic'));
        const comic = docSnap.docs.map((item) => {
        //   console.log(item.ref)
        //   const subcollectionRef = collection(item.ref, 'YZOoN8D6Ued98MSS7xEF');
        //   const subcollectionSnapshot = await getDocs(subcollectionRef)
        //   subcollectionSnapshot.forEach((chapterDoc) => {
        //     Xử lý dữ liệu từ subcollection ở đây
        //     console.log(chapterDoc.id, chapterDoc.data());
        // });
          return { id: item.id, ...item.data(),createTime: new Date(item.data().createTime?.toDate()).toISOString() };
          
        });
        if (comic.length !== 0) {
          return { comic, success: true };
        } else {
          return { message: 'No such document!', success: false };
        }
      },
    async getrandom(){
       // Tạo truy vấn sắp xếp theo trường 'randomField' và giới hạn kết quả là 1
  const q = query(collection(fireStore, 'yourCollection'), orderBy('randomField'), limit(1));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const randomDoc = querySnapshot.docs[0];
    console.log("Tài liệu ngẫu nhiên:", randomDoc.data());
  }
    },
    async getbyid(id) {
      const docRef = doc(fireStore, 'Comic', id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(),createTime: new Date(docSnap.data().createTime?.toDate()).toISOString(), success: true };
    } else {
      return { message: 'No such document!', success: false };
    }

    },
    async getchapters(id){
      const docRef = doc(fireStore, 'Comic', id);

      const docSnap = await getDoc(docRef);
    const ChaptersnRef = collection(docSnap.ref, id);
            const Chapters = await getDocs(ChaptersnRef)
            const chaps = Chapters.docs.map((item) => {
                return { id: item.id, ...item.data(),createTime: new Date(item.data().createTime?.toDate()).toISOString()  };
                
              });
              if (chaps.length !== 0) {
                return { chaps, success: true };
              } else {
                return { message: 'No such document!', success: false };
              }
            
    },
    async Add(data) {
      await addDoc(collection(fireStore, 'Comic'), {
        ...data,
        exchange: 'minus',
      });
    },
   
    async update(data, id) {
      const updatepoint = doc(fireStore, 'Comic', id);
  
      // Set the "capital" field of the city 'DC'
      await updateDoc(updatepoint, data);
    },
    async Delete(id) {
        await deleteDoc(doc(fireStore, 'Comic', id));
      },
    
  };
  export default comicFireBase;
  