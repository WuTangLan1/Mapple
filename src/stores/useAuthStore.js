// src/stores/useAuthStore.js
import { defineStore } from 'pinia';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/components/fbdir/fbInit';

export const useAuthStore = defineStore('auth', {
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

        // Save additional user details in Firestore
        const userProfile = {
          full_name: fullName,
          dayscomp: [],  // Assuming it's an empty array to start with
          highscore: 0
        };

        await setDoc(doc(db, 'profiles', user.uid), userProfile);

        console.log('User registered and profile created in Firestore');
        return user;
      } catch (error) {
        console.error('Error registering user', error);
        throw error;
      }
    }
  }
});
