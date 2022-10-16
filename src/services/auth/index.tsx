
import React, { useReducer } from 'react'

//types
import { IAuthState, TAuthActons, TAuthContext, TAuthProvider } from 'types';

export const AuthState = React.createContext<TAuthContext | null>(null)

const initialState: IAuthState = {
    refreshToken: window.localStorage.getItem('firebaseRefreshToken') || '',
    isAuthenticated: window.localStorage.getItem('firebaseRefreshToken') !== null && window.localStorage.getItem('firebaseRefreshToken') !== ''
}

const reducer = (state: IAuthState, action: TAuthActons): IAuthState => {
    switch (action.type) {
        case 'SET_REFRESH_TOKEN':
            return { ...state, refreshToken: action.refreshToken, isAuthenticated: action.isAuthenticated };

        default:
            return state;
    }
}

const AuthProvider = ({ children }: TAuthProvider) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const setToken = (refreshToken: string) => {
        window.localStorage.setItem('firebaseRefreshToken', refreshToken)

        dispatch({ type: 'SET_REFRESH_TOKEN', refreshToken, isAuthenticated: true })
    }

    const logout = () => {
        window.localStorage.setItem('firebaseRefreshToken', '')

        dispatch({ type: 'SET_REFRESH_TOKEN', refreshToken: '', isAuthenticated: false })
    }

    const value = {
        state,
        setToken,
        logout
    }

    return (
        <AuthState.Provider value={value}>
            {children}
        </AuthState.Provider>
    )
}

export default AuthProvider