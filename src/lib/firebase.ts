// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
	apiKey: 'AIzaSyAGzLOohYTVj8-e12TW7gLH4SL7P-6VAXs',

	authDomain: 'svelte-linktree-clone.firebaseapp.com',

	projectId: 'svelte-linktree-clone',

	storageBucket: 'svelte-linktree-clone.appspot.com',

	messagingSenderId: '990939015574',

	appId: '1:990939015574:web:cf3c4e9afc80d2f84255b7'
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
