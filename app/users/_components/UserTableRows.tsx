import { Badge, Link, Table } from "@radix-ui/themes";
import React from "react";
import { GoPencil } from "react-icons/go";
interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	roles: Role[];
}

interface Role {
	id: string;
	name: string;
}

interface Props {
	userId: string;
}

const UserTableRow = async ({ userId }: Props) => {
	let data = await fetch("https://sviluppo4.arsdue.com/users/" + userId);
	let user = await data.json();
	return (
		<Table.Row key={user.id}>
			<Table.RowHeaderCell>
				<Link href={`/users/${user.id}`}>
					{user.firstName} {user.lastName}
				</Link>
			</Table.RowHeaderCell>
			<Table.Cell>{user.email}</Table.Cell>
			<Table.Cell>User business unit</Table.Cell>
			<Table.Cell>
				{user.roles
					? user.roles.map((role: Role) => (
							<Badge color="blue" ml="2">
								{role.name}
							</Badge>
					  ))
					: "No roles assigned"}
			</Table.Cell>
			<Table.Cell>
				<Link href={`/users/${user.id}/edit`}>
					<GoPencil size="18" />
				</Link>
			</Table.Cell>

			<Table.Cell></Table.Cell>
		</Table.Row>
	);
};

export default UserTableRow;
