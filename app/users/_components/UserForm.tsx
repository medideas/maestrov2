"use client";
import { userSchema } from "@/app/validationSchemas";
import { Flex } from "@radix-ui/themes";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { z } from "zod";

interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	roles: Role[];
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
	roles,
	businessUnits,
	languages,
	regions,
	jobTitles,
}: {
	user?: User;
	roles: Role[];
	businessUnits: BusinessUnit[];
	languages: Language[];
	regions: Region[];
	jobTitles: JobTitle[];
}) => {
	const router = useRouter();
	console.log(businessUnits);
	return (
		<div>
			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					email: "",
					regionId: "",
					languageId: "",
					businessUnitId: "",
					jobTitleId: "",
					roleIds: [],
				}}
				onSubmit={async (values) => {
					console.log(JSON.stringify(values));
					await fetch("https://sviluppo4.arsdue.com/users", {
						mode: "no-cors",
						method: "POST",
						headers: {
							Accept: "application/json",
							"Content-type": "application/json",
						},
						body: JSON.stringify(values),
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
							<label htmlFor="businessUnit">Business Unit</label>
							<Field as="select" name="businessUnitId">
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
							<Field as="select" name="regionId">
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
							<Field as="select" name="languageId">
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
							<label htmlFor="jobTitle">Job Title</label>
							<Field as="select" name="jobTitleId">
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
								<label htmlFor="roleUser">
									<Field type="checkbox" name="roleIds" value={role.id} />{" "}
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
		</div>
	);
};

export default UserForm;
