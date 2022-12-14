import Link from "next/link";
import { useContext } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import { useEffect } from 'react';
import { parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { GetServerSideProps } from "next";
import { redirect } from "next/dist/server/api-utils";


export default function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const { 'access_token': token } = parseCookies();
    if(!token) Router.push('/login');
  }, [])

  function logout() {
    destroyCookie(undefined, 'access_token');
    Router.push('/login');
  }

  return (
    <div className="h-screen w-full">
      <nav className="w-full h-16 bg-slate-900 absolute flex justify-between px-4 items-center text-white">
        <span>Welcome { user?.name }</span>
        <button className="cursor-pointer" onClick={() => logout()} >
          Logout
        </button>
      </nav>
      <main className="flex h-full justify-center items-center">
        <div className="border rounded-lg shadow-md h-20 flex justify-start items-center w-[400px]">
          <div className="mx-auto flex items-center justify-center">
            <input
              type="text"
              name="user"
              id="github-user"
              className="block w-full border-b-2 border-gray-300 shadow-sm text-base mr-2"
              placeholder="Github user"
            />
            <button className="rounded-md px-3 py-2 bg-blue-800 uppercase text-white">
              Search
            </button>
          </div>
        </div>
        
      </main>

    </div>
  )
}

//TODO: if needs the validation on server side adapt the request
//? The parseCookies using the api service does not work in serverside withou the 'Context'
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const apiClient = getAPIClient(ctx)
//   const { ['access_token']: token } = parseCookies(ctx);

//   if (!token) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       }
//     }
//   }

//   return {
//     props: {}
//   }
// }