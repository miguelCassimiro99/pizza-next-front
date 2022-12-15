import Image from "next/image"

interface GithubUserCardProps {
  avatar_url: string | undefined
  login: string | undefined
}

export default function GithubUserCard({ avatar_url, login }: GithubUserCardProps) {
  return (
    <div className="cursor-pointer flex flex-col justify-center items-center space-x-2">
      <div className="w-10 h-10">
        <Image src={avatar_url || "/public/avatardefault.png"} alt="github-profile-photo" height={100} width={100} className="rounded-full" />
      </div>
      <span className="text-xs font-bold uppercase">{login || "user"}</span>
    </div>
  )
}