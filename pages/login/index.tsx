import type { NextPageWithLayout } from '../_app'
import Login from '../../Components/Login/Login'
import { ReactElement } from 'react'

const LoginPage: NextPageWithLayout = () => {
    return (
        <Login type="login" />
    )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            {page}
        </>
    )
}

export default LoginPage
