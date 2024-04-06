//src\components\fbdir\fbInit.js

import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import fbConfig from './fbConfig';

const firebaseApp = initializeApp(fbConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

// Export section 
//---------------------------------------------------------------------------------------------------------------------------

export {db, auth, storage}


//---------------------------------------------------------------------------------------------------------------------------