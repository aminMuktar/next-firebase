import { getDoc, setDoc, updateDoc } from "firebase/firestore";
import { promiseWrapper } from "../../utils/promiseWrapper";
import { getDocData, userDocRef } from "./setup";

export const fetchUserData = promiseWrapper(async (userId: string) => {
    const response = await getDoc(userDocRef(userId));
    if (response.exists()) {
        return getDocData(response);
    }
    return null;
});

export const updateProfileImage = promiseWrapper(
    async (userId: string, image: string) => {
        await updateDoc(userDocRef(userId), { profileImage: image });
        return;
    }
);

export const removeProfileImage = promiseWrapper(async (userId) => {
    await setDoc(userDocRef(userId), { profileImage: null });
    return;
});
