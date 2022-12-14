import Router from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { useContext, useEffect, useState } from 'react';
import RepositoryCard, { RepositoryCardProps } from "../components/RepositoryCard";
import { AuthContext } from "../contexts/AuthContext";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TrashIcon  } from '@heroicons/react/24/solid'

interface FormValue {
  username: string;
}


export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm<FormValue>();
  const [repositories , setReposList] = useState<RepositoryCardProps[] | undefined>([])
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const { 'access_token': token } = parseCookies();
    if(!token) Router.push('/login');
  }, [])

  function logout() {
    destroyCookie(undefined, 'access_token');
    Router.push('/login');
  }

  async function getRepositoriesList(data: FormValue) {
    try {
      setReposList([]);
      setErrorMessage("");
      if(!data) return;

      const url = `https://api.github.com/users/${data.username}/repos`

      const response = await axios.get<RepositoryCardProps[]>(url);

      if(!response.data) {
        setErrorMessage("user not found or doesn't have public repositories");
      }

      const repoList = [] as RepositoryCardProps[]
      response.data.forEach((repo: RepositoryCardProps) => {
        let repoJson = {
          name: repo.name,
          createdAt: repo.createdAt,
          id: repo.id,
          open_issues_count: repo.open_issues_count,
          description: repo.description,
          language: repo.language,
          url: repo.url
        } as RepositoryCardProps
        repoList.push(repoJson);
      })

      setReposList(repoList);
      
    } catch (error) {
      console.log(error)
      setErrorMessage("user not found or doesn't have public repositories");
    }
    
  }

  return (
    <div className="h-screen w-full">
      <nav className="w-full h-16 bg-slate-900 absolute flex justify-between px-4 items-center text-white">
        <span>Welcome { user?.name }</span>
        <button className="cursor-pointer" onClick={() => logout()} >
          Logout
        </button>
      </nav>
      <main className="flex flex-col h-full justify-center items-center px-4">
        <div className="border rounded-lg shadow-md h-20 px-2 flex justify-start items-center md:w-[400px]">
          <form
            onSubmit={handleSubmit(getRepositoriesList)}
            className="mx-auto flex flex-col px-2 space-y-4 md:flex-row items-center justify-center"
          >
            <input
              {...register('username')}
              type="text"
              name="username"
              id="username"
              className="block w-full border-b-2 border-gray-300 shadow-sm text-base mr-2"
              placeholder="Github user"
            />
            <button type="submit" className="rounded-md text-sm md:text-base px-3 py-2 bg-blue-800 uppercase text-white">
              Search
            </button>
          </form>
        </div>
        {errorMessage && 
          (<span className="pt-3 text-red-600 uppercase text-sm">{errorMessage}</span>)
        }
        <hr />

        <div className=" max-w-3xl overflow-x-auto mt-10 flex items-center justify-start w-full space-x-2 snap-x snap-center">
          {repositories && 
            (repositories.map(repository => (
              <RepositoryCard {...repository} key={repository.id} />
            )))
          }
        </div>

        {repositories && repositories.length > 0 ?
        (
          <div className="flex items-center justify-end w-full mr-28 my-3">
            <button className="text-sm rounded-lg bg-red-600 px-2 py-1 flex justify-center items-center" onClick={() => setReposList([])}>
              <TrashIcon className="w-4 h-4 text-white" />
              <span className="text-sm uppercase text-white">reset</span>
            </button>
          </div>
        ) : ""}
        
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