"use client";
import { EyeOpenIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Table } from "@radix-ui/themes";
import Link from "next/link";
import React, { useState } from "react";
import { GoPencil } from "react-icons/go";
import DeleteUserButton from "./_components/DeleteUserModal";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useRouter } from "next/navigation";
import DeleteUserModal from "./_components/DeleteUserModal";

type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	jobTitle: JobTitle;
	businessUnit: BusinessUnit;
	language: Language;
	region: Region;
};

interface Props {
	users: User[];
	query: string;
}

type JobTitle = {
	name: string;
};

type BusinessUnit = {
	name: string;
};

type Language = {
	name: string;
};

type Region = {
	name: string;
};

const UsersTable = ({ users, query }: Props) => {
	const router = useRouter();
	const ViewUserButton = (props) => {
		return (
			<Button
				variant="outline"
				color="gray"
				mt="1"
				onClick={() => router.push("/users/" + props.value.toLocaleString())}
			>
				<EyeOpenIcon />
			</Button>
		);
	};
	const EditUserButton = (props) => {
		return (
			<Button
				variant="outline"
				color="gray"
				mt="1"
				onClick={() =>
					router.push("/users/" + props.value.toLocaleString() + "/edit")
				}
			>
				<Pencil2Icon />
			</Button>
		);
	};
	const DeleteUserButton = (props) => {
		return (
			<Button
				variant="outline"
				color="gray"
				mt="1"
				onClick={() => <DeleteUserModal props={props} />}
			>
				<TrashIcon />
			</Button>
		);
	};

	const [colDefs, setColDefs] = useState([
		{ field: "firstName" },
		{ field: "lastName", filter: true },
		{ field: "region.name" },
		{ field: "businessUnit.name" },
		{
			field: "roleUsers",
			valueGetter: (r: { role: { name: any } }) => r.name,
		},
		{ field: "language.name" },
		{
			field: "id",
			headerName: "View",
			width: 80,
			cellRenderer: ViewUserButton,
		},
		{
			field: "id",
			headerName: "Edit",
			width: 80,
			cellRenderer: EditUserButton,
		},
		{
			field: "id",
			headerName: "Delete",
			width: 80,
		},
	]);
	const [rowData, setRowData] = useState(users);
	return (
		<div
			className="ag-theme-quartz" // applying the Data Grid theme
			style={{ height: 500 }} // the Data Grid will fill the size of the parent container
		>
			<AgGridReact rowData={rowData} columnDefs={colDefs} />
			{/* <DeleteUserButton user={user} />; */}
		</div>
	);
};

export default UsersTable;
