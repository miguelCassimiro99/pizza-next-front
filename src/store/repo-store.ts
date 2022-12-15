import create from 'zustand'
import produce from 'immer'
import { IRepositoryProps } from '../types/default'

export interface IGithubUser {
  login: string,
  id: number,
  avatar_url: string
  gravatar_id: string
  repos_url: string
  created_at: string
  updated_at: string
}

export interface IGithubUserRepoStore {
  user: IGithubUser | undefined
  repositories: IRepositoryProps[]
}

interface IState {
  repositoriesList: IGithubUserRepoStore[] | undefined
}

interface IActions {
  setRepositoryListEmpty: () => void
  setUserRepositoryList: (collection: IGithubUserRepoStore) => void
}

interface IStore {
  state: IState
  actions: IActions
}

const initialState: IState = {
  repositoriesList: []
}

export const useStore = create<IStore>((set) => {
  const setState = (fn: any) => set(produce(fn) as (state: IStore) => IStore)

  return {
    state: initialState,
    actions: {
      setRepositoryListEmpty: () => {
        setState(({ state }: IStore) => {
          state.repositoriesList = []
        })
      },
      setUserRepositoryList: (collection) => {
        setState(({ state }: IStore) => {
          state.repositoriesList?.push(collection)
        })
      }
    }
  }
})