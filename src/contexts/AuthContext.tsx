import { createContext, ReactComponentElement, ReactFragment, ReactHTML, ReactNode, useState } from "react";
import { ISignInRequestData, signInRequest } from "../services/auth";
import { setCookie } from 'nookies'

type AuthContextType = {
  isAuthenticated: boolean;
}

export interface User {
  name: string
  email: string
}


const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children}: any) {
  const [user, setUser] = useState<User | undefined>();
  const isAuthenticated = false;

  async function signIn({email, password}: ISignInRequestData) {
    const { access_token } = await signInRequest({
      email,
      password,
    })

    setCookie(undefined, 'access_token', access_token, {
      maxAge: 24 * 60 * 3, //? 3 days
    })
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}