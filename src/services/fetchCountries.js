// this is the code for the src\services\fetchCountries.js

import { db } from '@/components/fbdir/fbInit'
import { collection, getDocs } from 'firebase/firestore';

// Fetch all countries from the Firestore collection
async function fetchCountries() {
  const countriesCollection = collection(db, 'countries');
  const countryDocs = await getDocs(countriesCollection);
  const countries = countryDocs.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return countries;
}

export { fetchCountries };