"use client";
import axios from "axios";
import { userSchema } from "@/app/validationSchemas";
import { Container, Flex } from "@radix-ui/themes";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { SiAxios } from "react-icons/si";
import { z } from "zod";

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

type UserFormData = z.infer<typeof userSchema>;

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
		lastName: "",
		email: "",
		regionId: "",
		languageId: "",
		businessUnitId: "",
		jobTitleId: "",
		roleIds: [],
	};
	console.log(user);
	return (
		<Container>
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					console.log(JSON.stringify(values));
					axios.post("https://sviluppo4.arsdue.com/users/", values, {
						headers: {
							"Content-Type": "application/json",
						},
					});
				}}
			>
				<Form>
					<Flex>
						<div>
							<label>First name</label>
							<Field name="firstName" className="border-2 mx-3" />
						</div>
						<div>
							<label>Last name</label>
							<Field name="lastName" className="border-2 mx-3" />
						</div>
					</Flex>
					<Flex mt="4">
						<div>
							<label>Email</label>
							<Field name="email" className="border-2 mx-3" />
						</div>
					</Flex>
					<Flex>
						<div>
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
					</Flex>
					<Flex>
						<div>
							<label htmlFor="regionId">Region</label>
							<Field as="select" name="regionId" id="regionId">
								{regions.map((region) => (
									<option key={region.id} value={region.id}>
										{region.name}
									</option>
								))}
							</Field>
						</div>
					</Flex>
					<Flex>
						<div>
							<label htmlFor="languageId">Language</label>
							<Field as="select" name="languageId" id="languageId">
								{languages.map((language) => (
									<option key={language.id} value={language.id}>
										{language.name}
									</option>
								))}
							</Field>
						</div>
					</Flex>
					<Flex>
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
					</Flex>
					<div role="group" aria-labelledby="checkbox-group">
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
					<div>
						<button className="btn mt-5 py-1 px-5 bg-primary" type="submit">
							Submit form
						</button>
					</div>
				</Form>
			</Formik>
		</Container>
	);
};

export default UserForm;
