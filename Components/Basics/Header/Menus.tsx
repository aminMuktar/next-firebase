import Box from '@mui/material/Box';
import ProfileAvatarAndMenus from './ProfileAvatarAndMenus';

export default function Menus() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <ProfileAvatarAndMenus />
        </Box>
    );
}