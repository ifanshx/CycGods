import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
  },
  callback: Function
) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    console.log(data);
    callback({ status: false, message: "Email already exists" });
  } else {
    callback({ status: true, message: "Registration Success" });
  }
}
