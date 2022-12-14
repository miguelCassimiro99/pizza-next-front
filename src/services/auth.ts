import axios from "axios";

export interface ISignInRequestData {
  email: string;
  password: string
}

export interface IUser {
  name: string
  email: string
}

export interface ISignInResponseData {
  access_token: string
  name: string
  email: string
}

interface ISignInReturn {
  access_token: string
  user: IUser
}

export async function signInRequest({email, password}: ISignInRequestData): Promise<ISignInReturn> {
  const loginUrl = 'http://localhost:3333/login';
  try {
    const response = await axios.post<ISignInResponseData>(loginUrl, {email, password});
    const token = response.data;
    
    return {
      access_token: token.access_token,
      user: { email: token.email, name: token.name }
    }

  } catch (error) {
    throw new Error('Something went wrong')
  }
}

export async function getUserData(token: string): Promise<IUser | undefined> {
  const response = await axios.get('http://localhost:3333/me', {headers: {'Authorization': `Bearer ${token}`}})

  console.log('Fui chamado ', response.data);
  return {
    ...response.data,
  };
}