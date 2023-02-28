import SubHeader from "../Basics/SubHeader"
import ProfileForm from "./ProfileForm"
import ProfilePhoto from "./ProfilePhoto"
import Grid from "@mui/material/Grid"
import classes from './profile.module.scss'

function Profile() {
    return (
        <div>
            <SubHeader />
            <Grid container
                justifyContent="center"
                spacing={3}
                style={{padding: "20px"}}
            >
                <Grid item><ProfilePhoto /></Grid>
                <Grid item><ProfileForm /></Grid>
            </Grid>
        </div>
    )
}

export default Profile