import { z } from "zod";

export const articleSchema = z.object({
	title: z.string().min(1, "Title is required").max(255),
	content: z.string().min(1, "Content is required"),
	// attachmentId: z.string()
});

export const messageSchema = z.object({
	content: z.string().min(1, "Some content is required").max(65535),
	chatId: z.string().min(1, "Assign to chat is required"),
	messageFrom: z.enum(["USER", "AI"]),
});

export const chatSchema = z.object({
	title: z.string().min(1, "Title is required").max(255).optional(),
});

export const attachmentSchema = z.object({
	filename: z.string().min(1, "Filename is required"),
	storagePath: z.string().min(1, "storagePath is required"),
	extension: z.string(),
});

export const typeSchema = z.object({
	description: z.string().min(1, "Provide a description of the type"),
});

export const userSchema = z.object({
	firstName: z.string().min(1, "Provide fullname for the user"),
	lastName: z.string().min(1, "Provide fullname for the user"),
	email: z.string().min(1, "Provide email of user"),
	roles: z.array(z.string()),
	regionId: z.string(),
	jobTitleId: z.string(),
	languageId: z.string(),
	businessId: z.string(),
});

export const competencySchema = z.object({
	name: z.string(),
	description: z.string(),
});

export const skillSchema = z.object({
	name: z.string(),
	description: z.string(),
});

export const jobTitleSchema = z.object({
	name: z.string(),
	description: z.string(),
	target: z.number(),
});

export const jobTitleSkillsSchema = z.object({});

export const assessmentSchema = z.object({
	name: z.string(),
	userId: z.string(),
});

export const assessmentResultSchema = z.object({
	name: z.string().min(1, "name"),
	jobTitleSkillId: z.string().min(1, "jobtitleskillid"),
	assessmentId: z.string().min(1, "assessmentId"),
	value: z.number().min(1, "value"),
});

export const regionSchema = z.object({
	name: z.string(),
});

export const businessUnitSchema = z.object({
	name: z.string(),
});
