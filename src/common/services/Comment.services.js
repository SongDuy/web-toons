import {
    collection,
    doc,
    getDocs,
    updateDoc,
    deleteDoc,
    getDoc,
    addDoc,
    query,
    where
  } from 'firebase/firestore';
import { fireStore } from '../themes/firebase';

  const CommentFireBase = {
    async get() {
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
    
    async getbyidseries(id) {
      const docRef =query(
        collection(fireStore, 'comment'),
        where('id', '==', id),
        where('type','==','comic')
      );;

    const docSnap = await getDocs(docRef);
    const Comment = docSnap.docs.map((item) => {
        return { idcomment: item.id, ...item.data(),createTime: new Date(item.data().createTime?.toDate()).toISOString()};
        
      });
    if (Comment.length !== 0) {
      return { Comment, success: true };
    } else {
      return { message: 'No such document!', success: false };
    }

    },
    async getbyid(id){
      const docRef =query(
        collection(fireStore, 'comment'),
        where('uid', '==', id),
      );;

    const docSnap = await getDocs(docRef);
    const Comment =await Promise.all( docSnap.docs.map(async (item) => {

      const comicRef = doc(fireStore, 'Comic', item.data().idcomic);

      const commicSnap = await getDoc(comicRef);
      if (commicSnap.exists()) {
        return {...commicSnap.data(),idcomment: item.id, ...item.data(),createTime: new Date(item.data().createTime?.toDate()).toISOString() };
      } else {
        return { idcomment: item.id, ...item.data(),createTime: new Date(item.data().createTime?.toDate()).toISOString(),title:"doesn't exit"};
      }
       
        
      }));
    if (Comment.length !== 0) {
      return { Comment, success: true };
    } else {
      return { message: 'No such document!', success: false };
    }

            
    },
    async Add(data) {
      await addDoc(collection(fireStore, 'comment'), data);
      //  const parentDocRef = doc(fireStore, 'Comic', data.idcomic);
      //   const subcollectionRef = collection(parentDocRef, data.idcomic);
      //   const subDocRef = doc(subcollectionRef, data.idseries);
      //   const subcollectRef = collection(subDocRef, data.idseries);
      //   const getdata={
      //     id:data.id,
      //     dislike:data.dislike,
      //     like:data.like,
      //     type:"comic",
      //     createTime:data.createTime,
      //     comment:data.comment

      //   }
      //       await addDoc(subcollectRef,getdata);
      
    
    },
   
    async update(data, iduser) {
      const updatepoint = doc(fireStore, 'comment', iduser);
  
      await updateDoc(updatepoint, data);
    },
    async Delete(id) {
        await deleteDoc(doc(fireStore, 'comment', id));
      },
    
  };
  export default CommentFireBase;
  