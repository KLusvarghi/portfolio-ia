import Tecnologies from "../technologies/Tecnologies"
import { Nivel } from "./Nivel"
import { Tipo } from "./Tipo"

export default interface Project {
	id: number
	nome: string
	descricao: string
	imagens: string[]
	tipo: Tipo
	nivel: Nivel
	repositorio: string
	destaque: string
	tecnologias: Tecnologies[]
}
