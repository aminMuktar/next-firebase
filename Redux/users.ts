import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../TS Types/redux.types";

const initialState: UserState | null = {
    email: "",
    firstName: "",
    lastName: "",
    bio: "",
    profileImage: "",
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        saveUser(state, action) {
            const { email, firstName, lastName, bio, profileImage } =
                action.payload;
            return { ...state, email, firstName, lastName, bio, profileImage };
        },
        updateProfileImage(state, action) {
            state.profileImage = action.payload.profileImage;
        },
    },
});

// Extract the action creators object and the reducer
const { actions, reducer } = userSlice;
// Extract and export each action creator by name
export const { saveUser, updateProfileImage } = actions;
// Export the reducer, either as a default or named export
export default reducer;
