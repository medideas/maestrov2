"use client";
import { Button } from "@radix-ui/themes";
import { Formik, Form, Field } from "formik";
import React from "react";

const Loginform = () => {
	return (
		<Formik
			initialValues={{ email: "" }}
			onSubmit={(values) => {
				console.log("here you should go to the new url");
			}}
		>
			<Form>
				<label htmlFor="email">
					Email
					<Field name="email" id="email" type="email" />
				</label>
				<Button type="submit" mt="3" variant="outline">
					Login with your Edwards email
				</Button>
			</Form>
		</Formik>
	);
};

export default Loginform;
