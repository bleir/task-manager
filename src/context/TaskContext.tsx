import React, { createContext, useContext, ReactNode } from 'react';
import { Task } from '../models/Task';
import { useTaskState } from '../state/taskState';

interface TaskContextProps {
	tasks: Task[];
	addTask: (task: Task) => void;
	updateTask: (taskId: string, updatedTask: Task) => void;
	deleteTask: (taskId: string) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const taskStore = useTaskState();

	return (
		<TaskContext.Provider value={taskStore}>
			{children}
		</TaskContext.Provider>
	);
};

export const useTaskContext = () => {
	const context = useContext(TaskContext);
	if (!context) {
		throw new Error('useTaskContext must be used within a TaskProvider');
	}
	return context;
};
