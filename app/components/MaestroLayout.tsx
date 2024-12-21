import AskMaestro from "../components/AskMaestro";

export default function MaestroLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			{children}
			<div className="w-[100%] bottom-0 fixed z-20">
				<AskMaestro />
			</div>
		</section>
	);
}
