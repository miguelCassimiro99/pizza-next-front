import Link from "next/link";
import { useContext } from 'react';
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div className="h-screen w-full">
      <nav className="w-full h-16 bg-slate-900 absolute flex justify-between px-4 items-center text-white">
        <span>Welcome { user?.name }</span>
        <Link href="#" className="cursor-pointer">
          Logout
        </Link>
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
