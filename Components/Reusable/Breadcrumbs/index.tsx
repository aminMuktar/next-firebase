import MuiBreadcrumbs from "@mui/material/Breadcrumbs"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import { useRouter } from "next/router"
import { LinksType, LinkType } from "../../../TS Types/subHeader.types"

//Both are optional if no data given then it will apply default one
type Props = {
    type?: 'general',
    links?: LinksType
}

const homeLink: LinkType = {
    label: "Home",
    type: 'link',
    link: '/'
}

function Breadcrumbs({ type = 'general', links = [] }: Props) {
    const { pathname } = useRouter()
    const pathsList = pathname.split('/')
    const pathsListLastItem = pathsList[pathsList.length - 1]

    links = type === "general" ? [homeLink, { label: pathsListLastItem, type: 'text' }] : links

    return (
        <MuiBreadcrumbs aria-label="breadcrumb">
            {
                links.map(item => {
                    const { label, type, link } = item

                    return <>
                        {
                            type === "link" ? <Link
                                underline="hover"
                                href={link}
                            >
                                {label}
                            </Link> : <Typography color="text.primary">{label}</Typography>
                        }
                    </>
                })
            }
        </MuiBreadcrumbs>
    )
}

export default Breadcrumbs