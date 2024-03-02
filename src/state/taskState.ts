import create from 'zustand';
import { Task } from '../models/Task';

interface TaskState {
	tasks: Task[];
	addTask: (task: Task) => void;
	updateTask: (taskId: string, updatedTask: Task) => void;
	deleteTask: (taskId: string) => void;
}

export const useTaskState = create<TaskState>((set) => ({
	tasks: [],
	addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
	updateTask: (taskId, updatedTask) =>
		set((state) => ({
			tasks: state.tasks.map((task) =>
				task.id === taskId ? updatedTask : task
			),
		})),
	deleteTask: (taskId) =>
		set((state) => ({
			tasks: [...state.tasks.filter((task) => task.id !== taskId)],
		})),
}));
