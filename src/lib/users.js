import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';

export const USERS_COLLECTION = 'users';

export async function getUserProfile(uid) {
  if (!db) return null;
  const snap = await getDoc(doc(db, USERS_COLLECTION, uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function createUserProfile(uid, { name, email, phone }) {
  if (!db) throw new Error('Firebase non configuré');

  const data = {
    name,
    email,
    phone,
    isAdmin: false,
    createdAt: new Date().toISOString(),
  };

  await setDoc(doc(db, USERS_COLLECTION, uid), data);
  return { id: uid, ...data };
}

export async function fetchAllUsers() {
  if (!db) return [];

  const q = query(collection(db, USERS_COLLECTION), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateUserAdminFields(uid, fields) {
  if (!db) throw new Error('Firebase non configuré');
  await updateDoc(doc(db, USERS_COLLECTION, uid), fields);
}
