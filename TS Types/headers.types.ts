import { ReactNode } from "react";

export type ProfileMenuAvatarItems = {
    name: string;
    icon: ReactNode | null;
    link: string;
    onClick: (() => void) | null;
}[];
