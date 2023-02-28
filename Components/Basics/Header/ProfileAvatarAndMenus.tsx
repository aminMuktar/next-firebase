import { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { avatarSize, profileMenuAvatarItems } from './constants';
import Link from 'next/link';
import { firstChar } from '../../../utils/functions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';

export default function ProfileAvatarAndMenus() {
    const { email } = useSelector((state: RootState) => state.users)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isAvatarMenusOpen = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                onClick={handleClick}
                sx={{ ml: 2 }}
                aria-controls={isAvatarMenusOpen ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isAvatarMenusOpen ? 'true' : undefined}
            >
                <Avatar sx={{ width: avatarSize, height: avatarSize }}>{firstChar(email)}</Avatar>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={isAvatarMenusOpen}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {
                    profileMenuAvatarItems.map(item => {
                        const { name, link, icon, onClick } = item

                        const mainComponent = <MenuItem>
                            {icon} {name}
                        </MenuItem>

                        if (link) {
                            return (<Link key={name} href={link}>
                                {mainComponent}
                            </Link>)
                        }

                        // @ts-ignore
                        return <div key={name} onClick={onClick}>
                            {mainComponent}
                        </div>
                    })
                }
            </Menu>
        </>
    );
}