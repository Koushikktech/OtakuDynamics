import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { auth, db } from "../services/config";
import { googleProvider, signInWithPopup } from "../services/config";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

// Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setFavorites([]);
    setCompleted([]);
  };
  const navigate = useNavigate();
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const currUser = result.user;
      setUser(currUser);

      const ref = doc(db, "users", currUser.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        await setDoc(ref, {
          email: currUser.email,
          favorites: [],
          completed: [],
        });
      }
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currUser) => {
      setUser(currUser);
      if (currUser) {
        const ref = doc(db, "users", currUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setFavorites(data.favorites || []);
          setCompleted(data.completed || []);
        } else {
          await setDoc(ref, {
            email: currUser.email,
            favorites: [],
            completed: [],
          });
        }
      } else {
        setFavorites([]);
        setCompleted([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Add to Favorites
  const addToFavorites = async (anime) => {
    if (!user) return;
    const newList = [...favorites, anime];
    setFavorites(newList);
    await updateDoc(doc(db, "users", user.uid), { favorites: newList });
  };

  const removeFavorites = async (animeId) => {
    if (!user) return;
    const updatedList = favorites.filter((anime) => anime.id !== animeId);
    setFavorites(updatedList);
    const animeToRemove = favorites.find((anime) => anime.id === animeId);
    if (animeToRemove) {
      await updateDoc(doc(db, "users", user.uid), {
        favorites: arrayRemove(animeToRemove),
      });
    }
  };

  // Add to Completed
  const addToCompleted = async (minimalAnime) => {
    if (!user) return;
    const newList = [...completed, minimalAnime];
    setCompleted(newList);
    await updateDoc(doc(db, "users", user.uid), { completed: newList });
  };

  const removeCompleted = async (animeId) => {
    if (!user) return;
    const updatedList = completed.filter((anime) => anime.id !== animeId);
    setCompleted(updatedList);
    const animeToRemove = completed.find((anime) => anime.id === animeId);
    if (animeToRemove) {
      await updateDoc(doc(db, "users", user.uid), {
        completed: arrayRemove(animeToRemove),
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        favorites,
        completed,
        addToFavorites,
        removeFavorites,
        removeCompleted,
        addToCompleted,
        loading,
        logout,
        loginWithGoogle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
