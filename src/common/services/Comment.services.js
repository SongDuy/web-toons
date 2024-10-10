import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  getDoc,
  addDoc,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { fireStore } from "../themes/firebase";

const CommentFireBase = {
  async get() {
    const docSnap = await getDocs(collection(fireStore, "Comic"));
    const comic = docSnap.docs.map((item) => {
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
    if (comic.length !== 0) {
      return { comic, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },

  async getbyidseries(id) {
    const docRef = query(
      collection(fireStore, "comment"),
      where("id", "==", id),
      where("type", "==", "comic")
    );

    const docSnap = await getDocs(docRef);
    const Comment = docSnap.docs.map((item) => {
      return {
        idcomment: item.id,
        ...item.data(),
        createTime: new Date(item.data().createTime?.toDate()).toISOString(),
      };
    });
    if (Comment.length !== 0) {
      return { Comment, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getbyidseriesVideo(id) {
    const docRef = query(
      collection(fireStore, "comment"),
      where("id", "==", id),
      where("type", "==", "Video")
    );

    const docSnap = await getDocs(docRef);
    const Comment = docSnap.docs.map((item) => {
      return {
        idcomment: item.id,
        ...item.data(),
        createTime: new Date(item.data().createTime?.toDate()).toISOString(),
      };
    });
    if (Comment.length !== 0) {
      return { Comment, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getbyid(id) {
    const docRef = query(
      collection(fireStore, "comment"),
      where("uid", "==", id)
    );

    const docSnap = await getDocs(docRef);
    const Comment = await Promise.all(
      docSnap.docs.map(async (item) => {
        const comicRef = item.data()?.idcomic? doc(fireStore, "Comic", item.data().idcomic):doc(fireStore, "Video", item.data().idVideo);

        const commicSnap = await getDoc(comicRef);
        if (commicSnap.exists()) {
          return {
            ...commicSnap.data(),
            idcomment: item.id,
            ...item.data(),
            createTime: new Date(
              item.data().createTime?.toDate()
            ).toISOString(),
          };
        } else {
          return {
            idcomment: item.id,
            ...item.data(),
            createTime: new Date(
              item.data().createTime?.toDate()
            ).toISOString(),
            title: "doesn't exit",
          };
        }
      })
    );
    if (Comment.length !== 0) {
      return { Comment, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async Add(data) {
    await addDoc(collection(fireStore, "comment"), data);
  },
  async getidrep(id) {
    const docRef = doc(fireStore, "comment", id);

    const docSnap = await getDoc(docRef);
    const repnRef = collection(docSnap.ref, id);
    const reps = await getDocs(repnRef);
    const rep = reps.docs.map((item) => {
      return {
        id: item.id,
        ...item.data(),
        createTime: new Date(item.data().createTime?.toDate()).toISOString(),
      };
    });
    if (rep.length !== 0) {
      return { rep, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async AddRep(data) {
    const parentDocRef = doc(fireStore, "comment", data.idcomment);
    const subcollectionRef = collection(parentDocRef, data.idcomment);

    const getdata = data?.idVideo?{
      idcomment: data.idcomment,
      nameUser: data.nameUser,
      uid: data.uid,
      dislike: data.dislike,
      like: data.like,
      idVideo: data.idVideo,
      idseries: data.idseries,
      createTime: data.createTime,
      rep: data.rep,
    }:{
      idcomment: data.idcomment,
      nameUser: data.nameUser,
      uid: data.uid,
      dislike: data.dislike,
      like: data.like,
      idcomic: data.idcomic,
      idseries: data.idseries,
      createTime: data.createTime,
      rep: data.rep,
    };
    await addDoc(subcollectionRef, getdata);
  },
  async Addlike(data) {
    const parentDocRef = doc(fireStore, "comment", data.idcomment);
    const subcollectionRef = collection(parentDocRef, "like");
    const docRef = doc(subcollectionRef, data.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await deleteDoc(docRef);
      await updateDoc(parentDocRef, {
        like: data.togglelike === 0 ? 0 : data.togglelike - 1,
      });
    } else {
      const getdata = {
        idcomment: data.idcomment,
        uid: data.uid,
        like: data.like,
      };
      await setDoc(docRef, getdata);

      await updateDoc(parentDocRef, { like: data.togglelike + 1 });
    }
  },
  async Adddislike(data) {
    const parentDocRef = doc(fireStore, "comment", data.idcomment);
    const subcollectionRef = collection(parentDocRef, "dislike");
    const docRef = doc(subcollectionRef, data.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await deleteDoc(docRef);

      await updateDoc(parentDocRef, {
        dislike: data.toggledislike === 0 ? 0 : data.toggledislike - 1,
      });
    } else {
      const getdata = {
        idcomment: data.idcomment,
        uid: data.uid,
        dislike: data.dislike,
      };
      await setDoc(docRef, getdata);
      await updateDoc(parentDocRef, { dislike: data.toggledislike + 1 });
    }
  },
  async Addreplike(data) {
    const parentDocRef = doc(fireStore, "comment", data.idcomment);
    const repcollectionRef = collection(parentDocRef,data.idcomment);
    const subrepRef=doc(repcollectionRef,data.idrep)
    const subcollectionRef = collection(subrepRef, "like");
    const docRef = doc(subcollectionRef, data.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await deleteDoc(docRef);
     

      await updateDoc(subrepRef, {
        like: data.togglelike === 0 ? 0 : data.togglelike - 1,
      });
    } else {
      const getdata = {
        idcomment: data.idcomment,
        uid: data.uid,
        idrep:data.idrep,
        like: data.like,
      };
    
      await setDoc(docRef, getdata);
    

      await updateDoc(subrepRef, { like: data.togglelike + 1 });
    }
  },
  async Addrepdislike(data) {
    const parentDocRef = doc(fireStore, "comment", data.idcomment);
    const repcollectionRef = collection(parentDocRef,data.idcomment);
    const subrepRef=doc(repcollectionRef,data.idrep)
    const subcollectionRef = collection(subrepRef, "dislike");
    const docRef = doc(subcollectionRef, data.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await deleteDoc(docRef);
     

      await updateDoc(subrepRef, {
        dislike: data.toggledislike === 0 ? 0 : data.toggledislike - 1,
      });
    } else {
      const getdata = {
        idcomment: data.idcomment,
        uid: data.uid,
        idrep:data.idrep,
        dislike: data.dislike,
      };
      await setDoc(docRef, getdata);
    

      await updateDoc(subrepRef, { dislike: data.toggledislike + 1 });
    }
  },
  async update(data, iduser) {
    const updatepoint = doc(fireStore, "comment", iduser);

    await updateDoc(updatepoint, data);
  },
  async Delete(id) {
    const docRef = doc(fireStore, "comment", id);
    const subcollectionRef = collection(docRef, id);
    const subcollectionLike = collection(docRef, "like");
    const subcollectionDislike = collection(docRef, "dislike");
    const querySnapshotid = await getDocs(subcollectionRef);
    for (const documentid of querySnapshotid.docs) {
      const subcollectionLike = collection(documentid.ref, "like");
      const subcollectionDislike = collection(documentid.ref, "dislike");
      await this.deleteSubcollection(subcollectionDislike, id);
      await this.deleteSubcollection(subcollectionLike, id);
    }
    // Xóa tất cả tài liệu trong các subcollections
    await this.deleteSubcollection(subcollectionRef, id);
    await this.deleteSubcollection(subcollectionLike, id);
    await this.deleteSubcollection(subcollectionDislike, id);
  
    // // Cuối cùng, xóa tài liệu chính trong 'comments'
    // await deleteDoc(doc(document.ref.firestore, document.ref.path));

    await deleteDoc(doc(fireStore, "comment", id));
  },

async  deleteSubcollection(subcollectionRef, uid) {
  const q = query(subcollectionRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  for (const subDoc of querySnapshot.docs) {
    await deleteDoc(doc(subDoc.ref.firestore, subDoc.ref.path));
  }
},
  async deleteAccount(id) {
    const commentsRef = collection(fireStore, "comment");
    const q = query(commentsRef, where("uid", "==", id));
    const querySnapshot = await getDocs(q);
    
    for (const document of querySnapshot.docs) {
      // Xóa các subcollections 'like', 'dislike', và 'comment'
      const subcollectionRef = collection(document.ref, document.id);
      const subcollectionLike = collection(document.ref, "like");
      const subcollectionDislike = collection(document.ref, "dislike");
      // const q = query(subcollectionRef, where("uid", "==", id));
      // const querySnapshotid = await getDocs(q);
      const querySnapshotid = await getDocs(subcollectionRef);

      for (const documentid of querySnapshotid.docs) {
        const subcollectionLike = collection(documentid.ref, "like");
        const subcollectionDislike = collection(documentid.ref, "dislike");
        await this.deleteSubcollection(subcollectionDislike, id);
        await this.deleteSubcollection(subcollectionLike, id);
      }
      // Xóa tất cả tài liệu trong các subcollections
      await this.deleteSubcollection(subcollectionRef, id);
      await this.deleteSubcollection(subcollectionLike, id);
      await this.deleteSubcollection(subcollectionDislike, id);
    
      // Cuối cùng, xóa tài liệu chính trong 'comments'
      await deleteDoc(doc(document.ref.firestore, document.ref.path));
  }
    // querySnapshot.forEach(async (docs) => {
   
    //   const subcollectionRef = collection(docs.ref, docs.id);
    //   await deleteDoc(doc(collection(docs.ref, "dislike")));

    //   // Query the subcollection (for example, filtering by 'uid')
    //   const qa = query(subcollectionRef, where("uid", "==", id));
    //   const subcollectionSnapshot = await getDocs(qa);
    // console.log(subcollectionSnapshot)
    //   // Log the documents found in the subcollection
    //   subcollectionSnapshot.forEach((subDoc) => {
    //     console.log(subDoc.data());
    //   });
    //   // await deleteDoc(doc.ref);
    // });
  }
};
export default CommentFireBase;
