import { Container } from "./Container"
import { Nav } from "./Nav/Nav"
import Image from "next/image"
import Link from "next/link"

export function Header() {
	return (
		<header className="w-full flex items-center h-16 bg-black/50">
			{/*  flex-1 para ocupar o espaço total*/}
			<Container className="flex-1 flex justify-between items-center">
				<div className="flex items-center gap-10">
					<Link href="/" className="hiddenn sm:block">
						<Image src="/logo.svg" alt="Logo" width={80} height={0} />
					</Link>
					<Nav />
				</div>
				<div className="hidden sm:flex items-center">
					<Link
						href="https://www.linkedin.com/in/kaua-lusvarghi-frontend-dev/"
						target="_blank"
						className="bg-red-500 rounded-full px-7 py-1 text-sm font-bold"
					>
						Perfil
					</Link>
				</div>
			</Container>
		</header>
	)
}
