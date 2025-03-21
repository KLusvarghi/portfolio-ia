import { Header } from "../shared/Header"

export default function Main() {
	return (
		<div
			className="flex flex-col items-center justify-center h-[500px] bg-[url('/main.jpg')] bg-cover bg-center
    "
		>
			<Header />
			<div className="flex-1 flex flex-col justify-center items-center">
				<h1 className="flex gap-3 items-center">
					<span className="w-2 h-2 rounded-full bg-red-500"></span>
					<span className="text-3xl sm:text-5xl font-bold text-center">Kauã Lusvarghi</span>
					<span className="w-2 h-2 rounded-full bg-red-500"></span>
				</h1>
				<h2 className="text-zinc-500 font-semibold">CTO da COD3R Ensino e Consultoria</h2>
			</div>
		</div>
	)
}
