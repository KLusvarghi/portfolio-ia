import { ButtonChat } from "../../components/chat/ButtonChat"

export default function Layout(props: { children: React.ReactNode }) {
	return (
		<div>
			{props.children}
			<ButtonChat />
		</div>
	)
}
