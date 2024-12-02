"use client";
import { Button } from "@radix-ui/themes";
import React from "react";

interface Props {
	pdf: Pdf;
}

type Pdf = {
	content: String;
	title: String;
	extension: String;
};

function downloadPDF(pdf): any {
	const pdfLink = `${pdf.content}`;
	const anchorElement = document.createElement("a");
	const fileName = `${pdf.title}.pdf`;
	anchorElement.href = pdfLink;
	anchorElement.download = fileName;
	anchorElement.click();
}

const DownloadFile = ({ pdf }: { pdf: Pdf }) => {
	return (
		<Button variant="outline" onClick={() => downloadPDF(pdf)}>
			Download the resource
		</Button>
	);
};

export default DownloadFile;
