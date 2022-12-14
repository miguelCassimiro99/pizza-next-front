import axios from "axios";

export interface ISignInRequestData {
  email: string;
  password: string
}

export interface ISignInResponseData {
  access_token: string
}

interface ISignInReturn {
  access_token: string,
}

export async function signInRequest(data: ISignInRequestData): Promise<ISignInReturn> {
  const loginUrl = 'http://localhost:3333/login';
  try {
    const response = await axios.post<ISignInResponseData>(loginUrl, {...data});
    const token = response.data.access_token;
    
    return {
      access_token: token,
    }

  } catch (error) {
    throw new Error('Something went wrong')
  }
}