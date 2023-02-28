import { useState } from 'react'
import CustomAvatar from "../Reusable/Avatar"
import classes from './profile.module.scss'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import { handleError } from '../../utils/handleError';
import axios from 'axios';
import { updateProfileImage } from '../../Firebase/Database/users';
import { firebaseAuth } from '../../Firebase/auth';
import LinearProgress from '@mui/material/LinearProgress';

function ProfilePhoto() {
    const [profileImage, setProfileImage] = useState<string>('')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>('')
    const [progress, setProgress] = useState(-1)

    // @ts-ignore
    const handleImageSelection = (e) => {
        setSelectedFile(e.target.files[0]);
        const src = URL.createObjectURL(e.target.files[0]);
        setImagePreview(src);
    }

    const cancelUpload = () => {
        setSelectedFile(null)
        setImagePreview('')
    }

    const uploadImage = async () => {
        const formData: any = new FormData()
        formData.append("profileImage", selectedFile)
        try {
            const response: any = await axios.post(`/api/uploadProfile?userId=${123}`, formData, {
                onUploadProgress: (event) => {
                    // @ts-ignore
                    setProgress(Math.round((event.loaded * 100) / event.total))
                },
            })
            await updateProfileImage(firebaseAuth.currentUser?.uid, response.data.result)
            setProfileImage(response.data.result)
            setSelectedFile(null)
            setImagePreview('')
            setProgress(-1)
        } catch (error: any) { 
            handleError(error)
        }
    }

    const avatarUrl = imagePreview || profileImage || ''

    return (
        <Stack>
            <div className={classes.profilePhoto}>
                <CustomAvatar imageUrl={avatarUrl} altText={'profile avatar'} text="U" />
                <IconButton style={{ position: 'absolute', right: "4px", bottom: 0, color: "#fff" }} color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" onChange={handleImageSelection} />
                    <PhotoCamera />
                </IconButton>
            </div>
            {
                progress > -1 ? <LinearProgress style={{marginTop: "20px"}} variant="determinate" value={progress} /> : selectedFile ? <Stack direction={"row"} justifyContent="center">
                    <Tooltip title="Cancel">
                        <IconButton onClick={cancelUpload} color="error" aria-label="close" component="label">
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Upload">
                        <IconButton onClick={uploadImage} color="primary" aria-label="upload picture" component="label">
                            <FileUploadIcon className={classes.uploadIcon} />
                        </IconButton>
                    </Tooltip>

                </Stack> : <></>}
        </Stack>)
}

export default ProfilePhoto