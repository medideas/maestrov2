
interface Article {
	id: String;
	title: String;
	description: String;
	cover: String;
	content: String;
	duration: String;
	educationalFrameworkId: String;
	educationalToolId: String;
	educationalMethodologyId: String;
	sourceId: String;
	mediaId: String;
	languageId: String;
	aiGenerated: boolean;
	internalUseOnly: boolean;
};

interface EducationalFramework {
	id: String;
	name: String;
};

interface EducationalMethodology {
	id: String;
	name: String;
};

interface Media {
	id: String;
	name: String;
};

interface Language {
	id: String;
	name: String;
};

interface Source {
	id: String;
	name: String;
};

interface EducationalTool {
	id: String;
	name: String;
};

interface User {
	id: String;
	firstName: String;
	lastName: String;
	email: String;
	roleUsers: RoleUser[];
	roleIds: String[];
	regionId: String;
	region: Region;
	jobTitleId: String;
	jobTitle: JobTitle;
	languageId: String;
	language: Language;
	businessUnitId: String;
	businessUnit: BusinessUnit;
};

interface RoleUser{
	id: String;
    role: Role;
}

interface Role {
	id: String;
	name: String;
};

interface BusinessUnit {
	id: String;
	name: String;
}
interface Language {
	id: String;
	name: String;
}
interface Region {
	id: String;
	name: String;
}
interface JobTitle {
	id: String;
	name: String;
}

interface Chat {
	id: String;
	name: String;
}

interface Message{
	id: String;
	interface: String;
	text: String;
	citations: Citation[];
};

interface Citation {
	id: String;
	text: String;
	references: Reference[]
};

interface Reference{
	id: String;
	article: Article;
}

