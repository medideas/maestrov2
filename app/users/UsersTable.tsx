import { Badge, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { GoPencil } from "react-icons/go";

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

const UsersTable = ({ users }: Props) => {
	return (
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>Region</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>Business Unit</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>Roles</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>Language</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>Edit</Table.ColumnHeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{users.map((user) => (
					<Table.Row key={user.id}>
						<Table.RowHeaderCell>
							<Link href={`/users/${user.id}`}>
								{user.firstName} {user.lastName}
							</Link>
						</Table.RowHeaderCell>
						<Table.Cell>{user.email}</Table.Cell>
						<Table.Cell>{user.region.name}</Table.Cell>
						<Table.Cell>{user.businessUnit.name}</Table.Cell>
						<Table.Cell>{user.jobTitle.name}</Table.Cell>
						<Table.Cell>{user.language.name}</Table.Cell>

						<Table.Cell>
							<Link href={`/users/${user.id}/edit`}>
								<GoPencil size="18" />
							</Link>
						</Table.Cell>

						<Table.Cell></Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);
};

export default UsersTable;
