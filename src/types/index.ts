import { ButtonProps } from "@mui/material"
import { User } from "firebase/auth"

//Interfaces
export interface IAuthState {
    firebaseUser: User;
    refreshToken: string,
    isAuthenticated: boolean
}

export interface IAppButton extends ButtonProps {
    title: string,
    isLoading?: boolean
}


//Types
export type TAuthActons = { type: 'SET_REFRESH_TOKEN', refreshToken: string, isAuthenticated: boolean } | { type: 'SAVE_FIREBASE_USER', firebaseUser: User }

export type TAuthProvider = { children: React.ReactNode }

export type TAuthContext = { state: IAuthState, setToken: (refreshToken: string) => void, saveFirebaseUser: (user: User) => void, logout: () => void }

export type TProtectedRoute = { isAuthenticated: boolean, children: React.ReactNode }
export type TPublicdRoute = { isAuthenticated: boolean, children: React.ReactNode }