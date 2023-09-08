import "@/styles/globals.css"
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import axios from "axios"
import { AppProps } from "next/app"
import { NextRouter, useRouter } from "next/router"
import React from "react"
import { ToastContainer } from "react-toastify"

export default function App({ Component, pageProps }: AppProps) {
    const router: NextRouter = useRouter()

    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
                queryCache: new QueryCache({
                    onError: async (error) => {
                        // check if the error is an axios error
                        if (axios.isAxiosError(error)) {
                            if (error.response && error.response.status === 401) {
                                if (error.response.data.message === "-middleware/user-not-found") {
                                    router.replace("/logout")
                                }

                                if (error.response.data.message === "-middleware/user-email-not-verified") {
                                    if (router.pathname !== "/dashboard/verify-email") router.replace("/dashboard/verify-email")
                                }

                                if (error.response.data.message === "-middleware/user-deactivated") {
                                    if (router.pathname !== "/dashboard/deactivated") router.replace("/dashboard/deactivated")
                                }

                                if (error.response.data.message === "-middleware/user-not-authorized") {
                                    if (router.pathname !== "/dashboard/unauthorized") router.replace("/dashboard/unauthorized")
                                }

                                // this will run if the token is expired, and we've tried to refresh the token, but it's also expired
                                if (error.response.data.message === "-middleware/token-expired") {
                                    // update the message to the user
                                    error.response.data.message = "Login session has expired. Please login again."
                                    router.replace("/logout")
                                }
                            }
                        }
                    }
                })
            })
    )

    return (
        <>
            <ToastContainer newestOnTop={true} pauseOnHover={false} autoClose={3000} />

            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />

                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    )
}
