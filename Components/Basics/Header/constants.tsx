import Avatar from "@mui/material/Avatar";
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from "@mui/icons-material/Logout";
import { signoutUser } from "../../../Firebase/auth";
import { ProfileMenuAvatarItems } from "../../../TS Types/headers.types";

export const avatarSize: number = 45;

export const profileMenuAvatarItems: ProfileMenuAvatarItems = [
    {
        name: "Profile",
        icon: <Avatar />,
        link: '/profile',
        onClick: null
    },
    {
        name: "Logout",
        icon: <ListItemIcon>
            <Logout fontSize="small" />
        </ListItemIcon>,
        link: '',
        onClick: signoutUser
    }
];
