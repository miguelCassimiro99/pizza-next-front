import Router from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { useContext, useEffect, useState } from 'react';
import RepositoryCard from "../components/RepositoryCard";
import { AuthContext } from "../contexts/AuthContext";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TrashIcon, BookmarkIcon } from '@heroicons/react/24/solid'
import { IRepositoryProps } from "../types/default";
import { IGithubUser, IGithubUserRepoStore, useStore } from '../store/repo-store';
import GithubUserCard from "../components/GithubUserCard";

interface FormValue {
  username: string;
}

interface IUserToStore {
  login: string,
  id: number,
  avatar_url: string
  gravatar_id: string
  repos_url: string
  created_at: string
  updated_at: string
}


export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm<FormValue>();
  const [repositories , setReposList] = useState<IRepositoryProps[] | undefined>([])
  const [githubUser, setGithubUser] = useState<IUserToStore | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { setUserRepositoryList } = useStore((store) => store.actions);
  const { repositoriesList } = useStore((store) => store.state)

  useEffect(() => {
    const { 'access_token': token } = parseCookies();
    if(!token) Router.push('/');
  }, [])

  function logout() {
    destroyCookie(undefined, 'access_token');
    Router.push('/');
  }

  async function getRepositoriesList(data: FormValue) {
    try {
      setReposList([]);
      setGithubUser(undefined);

      setErrorMessage("");
      if(!data) return;

      const repoListUrl = `https://api.github.com/users/${data.username}/repos`
      const userInfoUrl = `https://api.github.com/users/${data.username}`

      const response = await axios.get<IRepositoryProps[]>(repoListUrl);

      if(!response.data) {
        setErrorMessage("user not found or doesn't have public repositories");
      }

      const repoList = [] as IRepositoryProps[]
      response.data.forEach((repo: IRepositoryProps) => {
        let repoJson = {
          name: repo.name,
          createdAt: repo.createdAt,
          id: repo.id,
          open_issues_count: repo.open_issues_count,
          description: repo.description,
          language: repo.language,
          url: repo.url
        } as IRepositoryProps
        repoList.push(repoJson);
      })

      setReposList(repoList);

      const userData = await axios.get<IGithubUser>(userInfoUrl);

      if(!userData.data) return;
      setGithubUser(userData.data);
      
    } catch (error) {
      console.log(error)
      setErrorMessage("user not found or doesn't have public repositories");
    }
    
  }

  function storeRepoList() {
    if(!repositories || !repositories.length) return;

    let collection:IGithubUserRepoStore = {
      user: githubUser,
      repositories,
    };
    setUserRepositoryList( collection );
  }

  function showSelectedUserRepoList(id: number | undefined) {
    if(!id) return;

    setReposList([]);
    
    repositoriesList?.forEach(repo => {
      if(repo.user?.id === id) setReposList(repo.repositories);
    })
  }

  return (
    <div className="h-screen w-full">
      <nav className="w-full h-16 bg-slate-900 absolute flex justify-between px-4 items-center text-white">
        <span>Welcome, { user?.name }</span>
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

        {/*  //TODO: create little card with avatar and name and with click return repo list */}
        <div className="flex items-center justify-center overflow-auto space-x-3 my-2">         
          {repositoriesList && repositoriesList.length > 0 ? (
            repositoriesList.map(collection => (
              <button key={collection.user?.id} onClick={() => showSelectedUserRepoList(collection.user?.id)}>
                <GithubUserCard login={collection.user?.login} avatar_url={collection.user?.avatar_url} />
              </button>
            ))
          ) : ("")}
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
          <div className="flex items-center justify-end w-full mr-28 my-3 space-x-2">
            <button
              className="text-sm rounded-lg bg-blue-600 px-2 py-1 flex justify-center items-center" 
              onClick={() => storeRepoList()}
            >
              <BookmarkIcon className="w-4 h-4 text-white" />
              <span className="text-sm uppercase text-white">Save list</span>
            </button>
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