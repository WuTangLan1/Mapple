// src/stores/useAuthStore.js
import { defineStore } from 'pinia';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
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
        this.user = { ...this.user, ...docSnap.data() };  // Ensure reactive update
      } else {
        console.error("No such profile!");
      }
    },
    async updateHighScore(newScore) {
      if (!this.user) return;
      const currentHighScore = this.user.highscore || 0;
      if (newScore > currentHighScore) {
        this.user.highscore = newScore;
        const userDocRef = doc(db, 'profiles', this.user.uid);
        await updateDoc(userDocRef, {
          highscore: newScore
        });
      }
    },
    initializeAuthListener() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          this.fetchUserProfile();  
        } else {
          this.isAuthenticated = false;
          this.user = null;
        }
      });
    },
  }
});
