import Avatar from '@mui/material/Avatar'
import { deepOrange } from '@mui/material/colors'
import { CSSProperties } from 'react'

const avatarStyle = { backgroundColor: deepOrange[500], height: "100%", width: '100%' }

type Props = {
    altText?: string,
    imageUrl?: string,
    text?: string,
    style?: CSSProperties,
    onClick?: () => void,
    className?: string,
}

function CustomAvatar({ altText = 'avatar', imageUrl, text, style = {}, onClick, className }: Props) {

    if (imageUrl) {
        return <Avatar alt={altText} src={imageUrl} style={{ ...avatarStyle, ...style }} onClick={onClick} className={className} />
    }

    return (<Avatar style={{ ...avatarStyle, ...style }} onClick={onClick} className={className} >
        {text}
    </Avatar>
    )
}

export default CustomAvatar