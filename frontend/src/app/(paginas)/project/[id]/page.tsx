import { Header } from "@/components/shared/Header"

// quando eu deixa a página como "async" ela será carregada lá no servidor de forma assíncrona, e a partir dela nós fazemos uma chamada para pegar os dados do projeto antes de renderizar a página.
export default async function ProjectDetails({ params }: { params: { id: string } }) {
	return (
		<div>
			<Header />
			{params.id}
		</div>
	)
}
