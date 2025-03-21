import classNames from "classnames"

export interface COntainerProps {
	children: React.ReactNode
	className?: string
}

// sendo esse componente um container, que vai envovler nossa aplicação apra que ela tenha uma largura máxima de 1280px e fique centralizada na tela
export function Container({ children, className }: COntainerProps) {
	return <div className={classNames("max-w-7xl mx-auto px-4", className)}>{children}</div>
}
