// src/stores/useAuthStore.js
import { defineStore } from 'pinia';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/components/fbdir/fbInit';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, 
  }),
  actions: {
    async registerUser(details) {
      const { username, fullName, password } = details;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, username, password);
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: fullName
        });

        const userProfile = {
          full_name: fullName,
          dayscomp: [],
          highscore: 0
        };

        await setDoc(doc(db, 'profiles', user.uid), userProfile);
        return user;
      } catch (error) {
        console.error('Error registering user', error);
        throw error;
      }
    },
    async loginUser(details) {
      const { username, password } = details;
      try {
        const userCredential = await signInWithEmailAndPassword(auth,username, password);
        return userCredential.user;
      } catch (error) {
        console.error('Error logging in', error);
        throw error;
      }
    },
    async logout() {
      await signOut(auth);
      this.user = null;
    },
    async fetchUserProfile() {
      if (!this.user) return;
    
      const docRef = doc(db, "profiles", this.user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().highscore; 
      } else {
        console.error("No such profile!");
        return 0; 
      }
    },
    initializeAuthListener() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.isAuthenticated = true;
                this.user = user;
            } else {
                this.isAuthenticated = false;
                this.user = null;
            }
        });
    },
  }
});
