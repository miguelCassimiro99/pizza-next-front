import create from 'zustand'
import produce from 'immer'

interface IState {
  name: string
}

interface IActions {
  setRepositoryList: (name: string) => void
}

interface IStore {
  state: IState
  actions: IActions
}

const initialState = {
  name: "Miguel"
}

export const useStore = create<IStore>((set) => {
  const setState = (fn: any) => set(produce(fn) as (state: IStore) => IStore)

  return {
    state: {
      ...initialState,
    },
    actions: {
      setRepositoryList: (name: string) => {
        setState(({ state }: IStore) => {
          state.name = name
        })
      }
    }
  }
})