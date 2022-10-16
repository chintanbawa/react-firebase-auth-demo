
import React, { useReducer } from 'react'
import { User } from 'firebase/auth';

//types
import { IAuthState, TAuthActons, TAuthContext, TAuthProvider } from 'types';

export const AuthState = React.createContext<TAuthContext | null>(null)

const initialState: IAuthState = {
    firebaseUser: JSON.parse(window.localStorage.getItem("firebaseUser") || '{}'),
    refreshToken: window.localStorage.getItem('firebaseRefreshToken') || '',
    isAuthenticated: window.localStorage.getItem('firebaseRefreshToken') !== null && window.localStorage.getItem('firebaseRefreshToken') !== ''
}

const reducer = (state: IAuthState, action: TAuthActons): IAuthState => {
    switch (action.type) {
        case 'SET_REFRESH_TOKEN':
            return { ...state, refreshToken: action.refreshToken, isAuthenticated: action.isAuthenticated };

        case 'SAVE_FIREBASE_USER':
            return { ...state, firebaseUser: action.firebaseUser };

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

    const saveFirebaseUser = (firebaseUser: User) => {
        window.localStorage.setItem('firebaseUser', JSON.stringify(firebaseUser))

        dispatch({ type: 'SAVE_FIREBASE_USER', firebaseUser })
    }

    const logout = () => {
        window.localStorage.setItem('firebaseRefreshToken', '')

        dispatch({ type: 'SET_REFRESH_TOKEN', refreshToken: '', isAuthenticated: false })
    }

    const value = {
        state,
        setToken,
        saveFirebaseUser,
        logout
    }

    return (
        <AuthState.Provider value={value}>
            {children}
        </AuthState.Provider>
    )
}

export default AuthProvider