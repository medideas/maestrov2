import { Badge, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { GoPencil } from "react-icons/go";
import UserTableRow from "./_components/UserTableRows";

interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
}

interface Props {
	users: User[];
}

const UsersTable = ({ users }: Props) => {
	return (
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>Business Unit</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>Roles</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>Edit</Table.ColumnHeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{users.map((user) => (
					<UserTableRow userId={user.id} />
				))}
			</Table.Body>
		</Table.Root>
	);
};

export default UsersTable;
