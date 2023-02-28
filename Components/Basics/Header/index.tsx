import Image from 'next/image'
import Menus from './Menus'

function Header() {

    return (
        <header className="flex-sa-c">
            <Image src={'/main2.png'} width="100" alt='lets-chat' height="90" />
            <Menus />
        </header>
    )
}

export default Header