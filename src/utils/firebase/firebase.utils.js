import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
} from 'firebase/auth';

import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
 } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCJeIqjy27yevCVjEU4Fko7snAbCKAiAZo",
    authDomain: "crwn-clothing-db-a00fa.firebaseapp.com",
    projectId: "crwn-clothing-db-a00fa",
    storageBucket: "crwn-clothing-db-a00fa.appspot.com",
    messagingSenderId: "919356978396",
    appId: "1:919356978396:web:bd8852ce708d02aa3a7019"
};
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,provider)


export const db = getFirestore();
export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
    ) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot)
    console.log(userSnapshot.exists())

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { 
                displayName, 
                email, 
                createdAt, 
                ...additionalInformation, 
            })
        } catch (error) {
           console.log('error creating the user', error.message) 
        }
    }
    return userDocRef
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    
    return await signInWithEmailAndPassword(auth, email, password);
}