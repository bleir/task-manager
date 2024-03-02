import { TaskStatus } from './types';

export const generateChipColor = (status: string) => {
	switch (status) {
		case 'To Do':
			return 'primary';
		case 'In Progress':
			return 'secondary';
		case 'In QA':
			return 'warning';
		case 'Done':
			return 'success';
	}
};

export const returnSelectOptions = (taskStatus: string) => {
	switch (taskStatus) {
		case TaskStatus.toDo:
			return [TaskStatus.toDo, TaskStatus.inProgress];
		case TaskStatus.inProgress:
			return [TaskStatus.inProgress, TaskStatus.blocked, TaskStatus.inQa];
		case TaskStatus.blocked:
			return [TaskStatus.blocked, TaskStatus.toDo];
		case TaskStatus.inQa:
			return [TaskStatus.inQa, TaskStatus.toDo, TaskStatus.done];
		case TaskStatus.done:
			return [TaskStatus.done, TaskStatus.deployed];
	}
};
