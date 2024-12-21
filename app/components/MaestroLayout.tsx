import ChatPrompt from "./ChatPrompt";

export default function MaestroLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			{children}
			<div className="w-[100%] bottom-0 fixed z-20 px-3 mb-3">
				<ChatPrompt shadow={true} />
			</div>
		</section>
	);
}
