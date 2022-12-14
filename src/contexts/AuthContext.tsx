import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import { getUserData, ISignInRequestData, signInRequest } from "../services/auth";
import { api } from '../services/api';

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null
  signIn: (data: ISignInRequestData) => void
}

export interface User {
  name: string
  email: string
}


export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children}: any) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'access_token': token } = parseCookies();
    
    if(!token) return;

    getUserData(token)
    .then((res) => {
      if(res?.email && res.name) setUser(res);
    })
  }, [])

  async function signIn({email, password}: ISignInRequestData) {
    const { access_token, user } = await signInRequest({
      email,
      password,
    })

    setCookie(undefined, 'access_token', access_token, {
      maxAge: 24 * 60 * 3, //? 3 days
    })

    if(access_token) api.defaults.headers['Authorization'] = `Bearer ${access_token}`;

    setUser(user)

    Router.push('/dashboard');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}