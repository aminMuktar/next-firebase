import "../styles/globals.scss";
import "../styles/main.scss"
import type { AppProps } from "next/app";
import { createTheme } from "@mui/material/styles";
import { blue, green, orange } from "@mui/material/colors";
import { ThemeProvider } from "@mui/styles";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Provider } from "react-redux";
import { dispatch, store } from "../Redux/store";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../Firebase/auth";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { saveUser } from "../Redux/users";
import '../TS Types/muiThem.types'
import Head from "next/head";
import PageLoader from "../Components/Reusable/PageLoader";
import { userEntryRoutes } from "../Constants/main";
import { usePageLoader } from "../customHooks/usePageLoader";
import Header from "../Components/Basics/Header";

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

//Type added '../TS Types/muiThem.types', which is imported above
const theme = createTheme({
    palette: {
        primary: {
            main: green[500],
        },
        secondary: {
            main: orange[700],
        },
        tertiary: {
            main: blue[500],
            dark: blue[800]
        }
    },
});

//Type of of main component
//Since it also has layout comming
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const router = useRouter()
    const [authenticating, setAuthenticating] = useState<boolean>(true)
    const { isPageLoading } = usePageLoader()

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (!user || !user.emailVerified) {
                if (!userEntryRoutes.includes(router.pathname)) {
                    router.push('/login')
                }
            } else {
                dispatch(saveUser(user.email))
                if (userEntryRoutes.includes(router.pathname)) {
                    router.push('/')
                }

            }
            setAuthenticating(false)
        })
    }, [])

    if (isPageLoading || authenticating) {
        return <PageLoader />
    }

    const getLayout = Component.getLayout

    return (
        <Provider store={store}>
            <Head>
                <title>Lets chat</title>
                <meta name="Lets chat" content="Lets chat is the group chat app for free" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ThemeProvider theme={theme}>
                <ReactNotifications />
                {/* If already layout present then render it else render deafult one */}
                {
                    getLayout ? getLayout(<Component {...pageProps} />) : (
                        <>
                            <Header />
                            <Component {...pageProps} />
                        </>
                    )
                }
            </ThemeProvider>
        </Provider>
    );
}

export default MyApp;
