"use client"
import { usePathname } from "next/navigation"
import { NavLink } from "./NavLink"

export function Nav() {
	const currentPage = usePathname()
	return (
		<nav className="flex gap-6">
			<NavLink href="/" selected={currentPage === "/"}>
				Inicio
			</NavLink>
			<NavLink href="/project/1" selected={currentPage === "/project/1"}>
				Projetos
			</NavLink>
			<NavLink href="/" selected={false} newWindown={true}>
				Contato
			</NavLink>
		</nav>
	)
}
