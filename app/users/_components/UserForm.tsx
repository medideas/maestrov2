"use client";
import axios from "axios";
import { userSchema } from "@/app/validationSchemas";
import {
	Container,
	Flex,
	Grid,
	Heading,
	Separator,
	Button,
} from "@radix-ui/themes";
import { Field, Form, Formik } from "formik";
import { redirect, useRouter, usePathname } from "next/navigation";
import { SiAxios } from "react-icons/si";
import { z } from "zod";
import { useState } from "react";
import Link from "next/link";

interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	roleIds: Role[];
	regionId: string;
	jobTitleId: string;
	languageId: string;
	businessUnitId: string;
}

interface Role {
	id: string;
	name: string;
}

interface BusinessUnit {
	id: string;
	name: string;
}
interface Language {
	id: string;
	name: string;
}
interface Region {
	id: string;
	name: string;
}
interface JobTitle {
	id: string;
	name: string;
}

const UserForm = ({
	user,
	businessUnits,
	languages,
	regions,
	jobTitles,
	roles,
}: {
	user?: User;
	businessUnits: BusinessUnit[];
	languages: Language[];
	regions: Region[];
	jobTitles: JobTitle[];
	roles: Role[];
}) => {
	const router = useRouter();
	const initialValues = {
		firstName: user?.firstName || "",
		lastName: user?.lastName || "",
		email: user?.email || "",
		regionId: user?.regionId || "",
		languageId: user?.languageId || "",
		businessUnitId: user?.businessUnitId || "",
		jobTitleId: user?.jobTitleId || "",
		roleIds: user?.roleIds || [],
	};
	const [submitting, setSubmitting] = useState(false);
	const pathname = usePathname();

	const isEditing = () => {
		return pathname.includes("/edit");
	};
	console.log(isEditing());
	return (
		<Container>
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					setSubmitting(true);
					if (isEditing()) {
						console.log(JSON.stringify(values));
						fetch(`https://sviluppo4.arsdue.com/users/${user?.id}`, {
							headers: {
								"Content-Type": "application/json",
							},
							method: "PATCH",
							body: JSON.stringify(values),
						});
					} else {
						console.log(JSON.stringify(values));
						fetch("https://sviluppo4.arsdue.com/" + "users/", {
							headers: {
								"Content-Type": "application/json",
							},
							method: "POST",
							body: JSON.stringify(values),
						});
					}
					router.push("/users");
				}}
			>
				<Form>
					<Grid gap="5" columns="2">
						<div>
							<label>First name</label>
							<Field name="firstName" className="border-2 mx-3" />
						</div>
						<div>
							<label>Last name</label>
							<Field name="lastName" className="border-2 mx-3" />
						</div>
					</Grid>
					<Grid mt="4">
						<div>
							<label>Email</label>
							<Field name="email" className="border-2 mx-3" />
						</div>
					</Grid>
					<Grid columns="2" my="3">
						<div className="p-3">
							<label htmlFor="businessUnitId">Business Unit</label>
							<Field as="select" name="businessUnitId" id="businessUnitId">
								<option>Select an option</option>
								{businessUnits.map((bu) => (
									<option key={bu.id} value={bu.id}>
										{bu.name}
									</option>
								))}
							</Field>
						</div>
						<div className="p-3">
							<label htmlFor="regionId">Region</label>
							<Field as="select" name="regionId" id="regionId">
								{regions.map((region) => (
									<option key={region.id} value={region.id}>
										{region.name}
									</option>
								))}
							</Field>
						</div>
					</Grid>
					<Grid columns="2" my="3">
						<div className="p-3">
							<label htmlFor="languageId">Language</label>
							<Field as="select" name="languageId" id="languageId">
								{languages.map((language) => (
									<option key={language.id} value={language.id}>
										{language.name}
									</option>
								))}
							</Field>
						</div>
						<div>
							<label htmlFor="jobTitleId">Job Title</label>
							<Field as="select" name="jobTitleId" id="jobTitleId">
								{jobTitles.map((jobTitle) => (
									<option key={jobTitle.id} value={jobTitle.id}>
										{jobTitle.name}
									</option>
								))}
							</Field>
						</div>
					</Grid>
					<Separator my="3" size="4" />
					<div role="group" aria-labelledby="checkbox-group">
						<Heading weight="light" size="5">
							Role
						</Heading>
						{roles.map((role, index) => (
							<div key={index}>
								<label htmlFor="roleIds">
									<Field
										type="checkbox"
										name="roleIds"
										value={role.id}
										id="roleIds"
									/>{" "}
									{role.name}
								</label>
							</div>
						))}
					</div>
					<Flex gap="2" pt="4">
						<Button
							className="btn mt-5 py-1 px-4 bg-primary"
							type="submit"
							disabled={submitting}
						>
							{isEditing() ? "Update user" : "Create new user"}
						</Button>
						<Link href="/users">
							<Button
								className="btn mt-5 py-1 px-5 bg-primary"
								type="button"
								variant="outline"
							>
								Cancel
							</Button>
						</Link>
					</Flex>
				</Form>
			</Formik>
		</Container>
	);
};

export default UserForm;
