export type StatusType = 'To Do' | 'In Progress' | 'In QA' | 'Done';

export interface Task {
	id: string;
	title: string;
	description: string;
	status: StatusType | string;
	createdAt: Date;
	history: { status: string; modifiedAt: Date }[];
}
