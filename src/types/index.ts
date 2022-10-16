import { ButtonProps } from "@mui/material"

//Interfaces
export interface IAuthState {
    refreshToken: string,
    isAuthenticated: boolean
}

export interface IAppButton extends ButtonProps {
    title: string,
    isLoading?: boolean
}


//Types
export type TAuthActons = { type: string, refreshToken: string, isAuthenticated: boolean }

export type TAuthProvider = { children: React.ReactNode }

export type TAuthContext = { state: IAuthState, setToken: (refreshToken: string) => void, logout: () => void }

export type TProtectedRoute = { isAuthenticated: boolean, children: React.ReactNode }
export type TPublicdRoute = { isAuthenticated: boolean, children: React.ReactNode }