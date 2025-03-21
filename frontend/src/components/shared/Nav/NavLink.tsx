import Link from "next/link"
import classNames from "classnames"

interface NavLinkProps {
	href: string
	children: React.ReactNode
	selected: boolean
	newWindown?: boolean
}

export const NavLink = ({ href, children, selected, newWindown = false }: NavLinkProps) => {
	return (
		<Link href={href} target={newWindown ? "_blank" : "_self"}>
			<span
				className={classNames("flex, itens-center gap-2 text-sm border-red-600 hover:text-white", {
					"border-b-4 text-white": selected,
					"text-zinc-300": !selected,
				})}
			>
				{children}
			</span>
		</Link>
	)
}
