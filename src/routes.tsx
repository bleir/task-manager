import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';
import TasksPage from './pages/TasksPage';

const AppRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/tasks' element={<TasksPage />} />
			<Route path='/tasks/edit/:taskId' element={<EditPage />} />
		</Routes>
	);
};

export default AppRoutes;
