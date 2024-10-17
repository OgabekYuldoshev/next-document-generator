import { CreateDocumentDialog } from "@/components/create-document-dialog";
import { DocumentList } from "@/components/document-list";

export default function Home() {
	return (
		<div className="flex flex-col w-full">
			<div className="h-16 border-b">
				<div className="w-full h-full mx-auto max-w-screen-lg px-2.5 flex items-center justify-between">
					<h2>LOGO</h2>
					<CreateDocumentDialog />
				</div>
			</div>
			<div className="w-full max-w-screen-lg px-2.5 py-4 mx-auto">
				<h2 className="font-bold text-xl">Your documents</h2>
				<DocumentList />
			</div>
		</div>
	);
}
