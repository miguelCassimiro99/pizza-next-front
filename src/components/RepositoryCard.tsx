import Link from "next/link";
import { BugAntIcon, ComputerDesktopIcon  } from '@heroicons/react/24/solid'

export interface RepositoryCardProps {
  name: string
  id: number
  description: string
  url: string
  language: string
  open_issues_count: number
  createdAt: string
}


export default function RepositoryCard({ name, id, description, url, language, open_issues_count, createdAt }: RepositoryCardProps) {
  return (
    <article className="min-w-[300px] h-52 border border-gray-800 px-8 py-4 rounded-md shadow-lg overflow-hidden">
      <Link href={url} target="_blank" className="cursor-pointer">
        <h2 className="text-lg font-bold uppercase text-gray-800">{name}</h2>
        <h3 className="text-sm uppercase text-gray-700">Created at: {createdAt}</h3>
        <p className="my-3 text-sm leading-tight text-gray-800">{ description }</p>
        
        <div className="flex justify-start items-center space-x-4 text-xs md:text-sm mt-10 text-gray-800">
          <div className="flex items-center justify-center space-x-1">
            <ComputerDesktopIcon className="w-4 h-4 text-gray-900" />
            <span>Language: { language }</span>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <BugAntIcon className=" w-4 h-4 text-red-500" />
            Issues: { open_issues_count }
          </div>
        </div>

      </Link>

    </article>
  )
}