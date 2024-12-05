"use client";
import { Button } from "@radix-ui/themes";
import React, { useEffect } from "react";
import { saveAs } from "file-saver";
import { getCookie } from "cookies-next";

interface Props {
	pdf: Pdf;
}

type Pdf = {
	content: String;
	title: String;
	extension: String;
};

const downloadPDF = async (articleId: string) => {
	const jwt = getCookie("jwt");
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_APIBASE}/articles/${articleId}/download`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		}
	);
	const downloadedDocument = await res.json();
	console.log(downloadedDocument);
	const atobfile = atob(downloadedDocument.content);
	const data: Blob = new Blob([atobfile], {
		type: downloadedDocument.mimeType,
	});

	saveAs(data, downloadedDocument.title + "." + downloadedDocument.extension);
};

const DownloadFile = ({ articleId }: { articleId: string }) => {
	return (
		<Button variant="outline" onClick={() => downloadPDF(articleId)}>
			Download the resource
		</Button>
	);
};

export default DownloadFile;
