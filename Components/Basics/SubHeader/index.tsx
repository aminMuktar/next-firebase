import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import { useRouter } from "next/router"
import Breadcrumbs from "../../Reusable/Breadcrumbs"
import { SubHeaderPropsType as SubHeaderProps } from '../../../TS Types/subHeader.types'
import classes from './subHeader.module.scss'

function SubHeader({ title, breadcrunbLinks, breadcrumbType }: SubHeaderProps) {
    const { pathname } = useRouter()
    const pathsList = pathname.split('/')
    const pathsListLastItem = pathsList[pathsList.length - 1]

    title = title || pathsListLastItem

    return (
        <div className={classes.container}>
            <Stack className={classes.subContainer} justifyContent="space-between" alignItems="center" direction="row" spacing={3}>
                <Typography variant="h5">
                    {title}
                </Typography>
                <Breadcrumbs type={breadcrumbType} links={breadcrunbLinks} />
            </Stack>
        </div>
    )
}

export default SubHeader