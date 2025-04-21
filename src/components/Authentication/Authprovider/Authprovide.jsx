// src/components/Authentication/Authprovider/Authprovide.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { author } from '../../../fbconfig';
import { getDatabase, ref, get } from 'firebase/database';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(author, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const db = getDatabase();
        const email = firebaseUser.email;

        const paths = [
          { path: 'users/employers', role: 'employer' },
          { path: 'users/managers', role: 'manager' },
        ];

        for (const { path, role } of paths) {
          const snap = await get(ref(db, path));
          if (snap.exists()) {
            const users = snap.val();
            for (let key in users) {
              if (users[key].email === email) {
                setRole(role);
                break;
              }
            }
          }
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
