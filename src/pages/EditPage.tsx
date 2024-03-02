import React from 'react';
import { Container } from '@mui/material';
import EditTaskForm from '../components/EditTaskForm';
import { useLocation } from 'react-router-dom';
import { BreadcrumbsComponent } from '../components/Breadcrumbs';

const EditPage: React.FC = () => {
	const location = useLocation();
	const splittedUrl = location.pathname.split('/');
	const taskId = splittedUrl[splittedUrl.length - 1];

	return (
		<Container maxWidth='sm'>
			<BreadcrumbsComponent currentPage='Edit' />
			<EditTaskForm taskId={taskId} />
		</Container>
	);
};

export default EditPage;
