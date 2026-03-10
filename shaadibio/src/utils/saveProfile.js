import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const saveProfile = async (userId, section, data) => {
  await setDoc(doc(db, "users", userId), { [section]: data }, { merge: true });
};

export const getProfile = async (userId) => {
  const snap = await getDoc(doc(db, "users", userId));
  return snap.exists() ? snap.data() : {};
};
