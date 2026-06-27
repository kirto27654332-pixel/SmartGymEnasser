import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../config/firebase';
import { createUserProfile, getUserProfile } from '../lib/users';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  const loadProfile = useCallback(async (firebaseUser) => {
    if (!firebaseUser) {
      setProfile(null);
      return null;
    }
    const data = await getUserProfile(firebaseUser.uid);
    setProfile(data);
    return data;
  }, []);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return undefined;
    }

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      await loadProfile(firebaseUser);
      setLoading(false);
    });

    return unsub;
  }, [loadProfile]);

  const signUp = useCallback(async ({ name, email, phone, password }) => {
    if (!auth) throw new Error('Firebase non configuré');
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const userProfile = await createUserProfile(cred.user.uid, { name, email, phone });
    setProfile(userProfile);
    return { user: cred.user, profile: userProfile };
  }, []);

  const signIn = useCallback(async (email, password) => {
    if (!auth) throw new Error('Firebase non configuré');
    const cred = await signInWithEmailAndPassword(auth, email, password);
    let userProfile = await getUserProfile(cred.user.uid);

    if (!userProfile) {
      userProfile = await createUserProfile(cred.user.uid, {
        name: cred.user.email?.split('@')[0] ?? 'Membre',
        email: cred.user.email ?? email,
        phone: '',
      });
    }

    setProfile(userProfile);
    return { user: cred.user, profile: userProfile };
  }, []);

  const logout = useCallback(async () => {
    if (!auth) return;
    await signOut(auth);
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!user) return null;
    return loadProfile(user);
  }, [user, loadProfile]);

  useEffect(() => {
    if (!user) return undefined;

    const onFocus = () => {
      loadProfile(user);
    };

    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [user, loadProfile]);

  const isAdmin = profile?.isAdmin === true;
  const firstName = profile?.name?.split(' ')[0] || user?.email?.split('@')[0] || '';

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      isAdmin,
      firstName,
      signUp,
      signIn,
      logout,
      refreshProfile,
    }),
    [user, profile, loading, isAdmin, firstName, signUp, signIn, logout, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
