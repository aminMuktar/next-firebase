import Image from "next/image"
import classes from './noPage.module.scss'
import { Alert } from '@mui/material'

function NoPageFound() {
    return (
        <div className={classes.container}>
            <div className={classes.imageContainer}>
                <Image alt="no-page-found" src={'/404.jpg'} layout="fill" objectFit="fill" />
            </div>
            <Alert variant="outlined" severity="error">No Page found</Alert>
        </div>
    )
}

export default NoPageFound