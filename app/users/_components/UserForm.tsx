"use client";
import {
	Container,
	Flex,
	Grid,
	Heading,
	Separator,
	Button,
} from "@radix-ui/themes";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { getCookie } from "cookies-next";
import * as Yup from "yup";
import FormCallout from "@/app/components/FormCallout";

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
	const jwt = getCookie("jwt");
	const [submitting, setSubmitting] = useState(false);
	const pathname = usePathname();

	const isEditing = () => {
		return pathname.includes("/edit");
	};

	const userSchema = Yup.object().shape({
		firstName: Yup.string().min(1).required("Add the first name"),
		lastName: Yup.string().min(1).required("Add the last name"),
		email: Yup.string().min(1).required("Add the email of the user"),
		regionId: Yup.string().min(1).required("Add the region of the user"),
		languageId: Yup.string().min(1).required("Add the language of the user"),
		businessUnitId: Yup.string()
			.min(1)
			.required("Add the Business Unit of the user"),
		jobTitleId: Yup.string().min(1).required("Add the Job Title of the user"),
		roleIds: Yup.string().min(1).required("Select the roles of this user"),
	});

	return (
		<Container>
			<Formik
				initialValues={initialValues}
				validationSchema={userSchema}
				onSubmit={(values) => {
					setSubmitting(true);
					if (isEditing()) {
						console.log(JSON.stringify(values));
						fetch(`${process.env.NEXT_PUBLIC_APIBASE}/users/${user?.id}`, {
							headers: {
								"Content-Type": "application/json",
								Authorization: "Bearer " + jwt,
							},
							method: "PATCH",
							body: JSON.stringify(values),
						});
					} else {
						console.log(JSON.stringify(values));
						fetch(`${process.env.NEXT_PUBLIC_APIBASE}/users/`, {
							headers: {
								"Content-Type": "application/json",
								Authorization: "Bearer " + jwt,
							},
							method: "POST",
							body: JSON.stringify(values),
						});
					}
					router.push("/users");
				}}
			>
				{({ values, touched, errors }) => (
					<Form>
						<Grid gap="5" columns="2">
							<div>
								<label>First name</label>
								<Field name="firstName" className="border-2 mx-3" />
								<ErrorMessage name="firstName" component="div">
									{(msg) => <FormCallout msg={msg} />}
								</ErrorMessage>
							</div>
							<div>
								<label>Last name</label>
								<Field name="lastName" className="border-2 mx-3" />
								<ErrorMessage name="lastName" component="div">
									{(msg) => <FormCallout msg={msg} />}
								</ErrorMessage>
							</div>
						</Grid>
						<Grid mt="4">
							<div>
								<label>Email</label>
								<Field name="email" className="border-2 mx-3" />
								<ErrorMessage name="email" component="div">
									{(msg) => <FormCallout msg={msg} />}
								</ErrorMessage>
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
								<ErrorMessage name="businessUnitId" component="div">
									{(msg) => <FormCallout msg={msg} />}
								</ErrorMessage>
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
								<ErrorMessage name="regionId" component="div">
									{(msg) => <FormCallout msg={msg} />}
								</ErrorMessage>
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
								<ErrorMessage name="languageId" component="div">
									{(msg) => <FormCallout msg={msg} />}
								</ErrorMessage>
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
								<ErrorMessage name="jobTitleId" component="div">
									{(msg) => <FormCallout msg={msg} />}
								</ErrorMessage>
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
									<ErrorMessage name="roleIds" component="div">
										{(msg) => <FormCallout msg={msg} />}
									</ErrorMessage>
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
				)}
			</Formik>
		</Container>
	);
};

export default UserForm;
