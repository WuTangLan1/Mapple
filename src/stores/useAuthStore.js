// src/stores/useAuthStore.js
import { defineStore } from 'pinia';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
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
        console.log('succwesfully auth reg user')

        await updateProfile(user, {
          displayName: fullName
        });

        const userProfile = {
          full_name: fullName,
          dayscomp: [],
          highscore: 0
        };

        await setDoc(doc(db, 'profiles', user.uid), userProfile);

        console.log('User registered and profile created in Firestore');
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
        console.log('Successfully logged in', userCredential.user);
        return userCredential.user;
      } catch (error) {
        console.error('Error logging in', error);
        throw error;
      }
    },
    async logout() {
      await signOut(auth);
      this.resetInp();
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
