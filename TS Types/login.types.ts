import { Rooms } from "./home.types";

export type LoginProps = {
    type: "login" | "signup" | 'forgotPassword';
};

export type Inputs = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
};

export type RoomsProps = {
    rooms: Rooms;
};

export type FormType = "login" | "signup" | "forgotPassword" | "setPassword";
