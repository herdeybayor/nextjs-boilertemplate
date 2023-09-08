import { OptionsType } from "cookies-next/lib/types"

export const BASE_COOKIE_CONFIG: OptionsType = {
    path: "/",
    // domain: process.env.NODE_ENV === "production" ? ".example.com" : "localhost",
    secure: false,
    httpOnly: false,
    sameSite: "lax"
}

export const ACCESS_TOKEN_COOKIE_NAME = "access-token"
export const REFRESH_TOKEN_COOKIE_NAME = "refresh-token"

export const ACCESS_TOKEN_COOKIE_CONFIG: OptionsType = {
    ...BASE_COOKIE_CONFIG,
    maxAge: 60 * 60 * 24 * 7 // 7 days
}

export const REFRESH_TOKEN_COOKIE_CONFIG: OptionsType = {
    ...BASE_COOKIE_CONFIG,
    maxAge: 60 * 60 * 24 * 7 * 4 // 4 weeks
}
