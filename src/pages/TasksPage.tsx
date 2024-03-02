import React from 'react';
import { Typography, Container } from '@mui/material';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { BreadcrumbsComponent } from '../components/Breadcrumbs';

const TasksPage: React.FC = () => {
	return (
		<Container
			maxWidth='sm'
			style={{
				display: 'flex',
				flexDirection: 'column',
				marginTop: 50,
			}}
		>
			<BreadcrumbsComponent currentPage='Home' />
			<TaskForm />

			<Typography variant='h5' style={{ fontSize: 24, fontWeight: 600 }}>
				Tasks
			</Typography>

			<TaskList />
		</Container>
	);
};

export default TasksPage;
