import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { serverTimestamp, setDoc } from "firebase/firestore";
import { promiseWrapper } from "../utils/promiseWrapper";
import { firebaseAuthRedirectUrl } from "./constants";
import { userDocRef } from "./Database/setup";
import { firebaseApp } from "./setup";

export const firebaseAuth = getAuth(firebaseApp);

export const createUser = promiseWrapper(
    async (
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) => {
        //Add to auth
        const createdUser = await createUserWithEmailAndPassword(
            firebaseAuth,
            email,
            password
        );
        //Add to separate collection main details to fetch user data
        //Add same id from auth to it using set doc else it will create new doc with own id in addDoc
        await setDoc(userDocRef(createdUser.user.uid), {
            email,
            firstName,
            lastName,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        // @ts-ignore
        await sendEmailVerification(firebaseAuth.currentUser, {
            url: firebaseAuthRedirectUrl,
        });
        return createdUser;
    }
);

export const signInUser = promiseWrapper(
    async (email: string, password: string) => {
        const user = await signInWithEmailAndPassword(
            firebaseAuth,
            email,
            password
        );
        if (!user.user.emailVerified) {
            throw new Error("This account needs to verify email first!");
        }
        return user;
    }
);

export const sendPasswordRestLink = promiseWrapper(async (email: string) => {
    await sendPasswordResetEmail(firebaseAuth, email, {
        url: firebaseAuthRedirectUrl,
    });
});

export const signoutUser = () => {
    signOut(firebaseAuth);
};
