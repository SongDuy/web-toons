import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  deleteDoc,
  getCountFromServer,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { fireStore, storage } from "../themes/firebase";
import deleteFolder from "../utils/DeleteFolder";
const userFireBase = {
  async getALL() {
    const docSnap = await getDocs(
      query(collection(fireStore, "Users"), where("role", "==", "user"))
    );

    const Users = docSnap.docs.map((item) => {
      //   console.log(item.ref)
      //   const subcollectionRef = collection(item.ref, 'YZOoN8D6Ued98MSS7xEF');
      //   const subcollectionSnapshot = await getDocs(subcollectionRef)
      //   subcollectionSnapshot.forEach((chapterDoc) => {
      //     Xử lý dữ liệu từ subcollection ở đây
      //     console.log(chapterDoc.id, chapterDoc.data());
      // });
      return item.data()?.birthday
        ? {
            id: item.id,
            ...item.data(),
            birthday: docSnap.data()?.birthday
              ? new Date(item.data()?.birthday?.toDate()).toISOString()
              : null,
            EmailVerification: docSnap.data()?.EmailVerification
              ? new Date(
                  docSnap.data()?.EmailVerification?.toDate()
                ).toISOString()
              : null,
            createTime: docSnap.data()?.createTime
              ? new Date(docSnap.data()?.createTime?.toDate()).toISOString()
              : null,
            success: true,
          }
        : {
            ...item.data(),
            EmailVerification: item.data()?.EmailVerification
              ? new Date(
                item.data()?.EmailVerification?.toDate()
                ).toISOString()
              : null,
            createTime: item.data()?.createTime
              ? new Date(item.data()?.createTime?.toDate()).toISOString()
              : null,
            success: true,
          };
    });
    if (Users.length !== 0) {
      return { Users, success: true };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async getcountUsers() {
    const coll = collection(fireStore, "Users");
    const snapshot = await getCountFromServer(coll);
    return snapshot.data().count;
  },
  async getbyid(iduser) {
    const docRef = doc(fireStore, "Users", iduser);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data()?.birthday
        ? {
            ...docSnap.data(),
            birthday: docSnap.data()?.birthday
              ? new Date(docSnap.data()?.birthday?.toDate()).toISOString()
              : null,
            EmailVerification: docSnap.data()?.EmailVerification
              ? new Date(
                  docSnap.data()?.EmailVerification?.toDate()
                ).toISOString()
              : null,
            createTime: docSnap.data()?.createTime
              ? new Date(docSnap.data()?.createTime?.toDate()).toISOString()
              : null,
            success: true,
          }
        : {
            ...docSnap.data(),
            EmailVerification: docSnap.data()?.EmailVerification
              ? new Date(
                  docSnap.data()?.EmailVerification?.toDate()
                ).toISOString()
              : null,
            createTime: docSnap.data()?.createTime
              ? new Date(docSnap.data()?.createTime?.toDate()).toISOString()
              : null,
            success: true,
          };
    } else {
      return { message: "No such document!", success: false };
    }
  },
  async Add(data, iduser) {
    await setDoc(doc(fireStore, "Users", iduser), data);
  },
  async update(data, iduser) {
    const update = doc(fireStore, "Users", iduser);

    await updateDoc(update, data);
  },
  async uploadToFirebase(file, name, iduser, key) {
    const storageRef = ref(storage, `cms_uploads/image/${iduser}/${name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('Upload is ' + progress + '% done');

          return progress;
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            const imageKeyMapping = {
              image: "image",
              horizontalThumbnail: "horizontalThumbnail",
            };

            const imageToUpdate = imageKeyMapping[key];
            if (imageToUpdate) {
              await this.update({ [imageToUpdate]: downloadUrl }, iduser);
            }

            resolve(downloadUrl);
          });
        }
      );
    });
    return uploadTask;
  },

  async deleteAccount(id) {
    const Ref = collection(fireStore, "Users");
    const q = query(Ref, where("uid", "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    await deleteFolder(`cms_uploads/image/${id}`);
  },
};
export default userFireBase;
