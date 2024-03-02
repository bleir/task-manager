import React from 'react';
import { Modal, Fade, Box, Typography, Button } from '@mui/material';
import TrashIcon from '../public/assets/trash.svg';
import { useTaskContext } from '../context/TaskContext';

interface TaskDeleteModalProps {
	isOpen: boolean;
	onClose: () => void;
	selectedTaskId: string | null;
	setIsDeleteModalOpen: (param: boolean) => void;
	setSelectedTaskId: (task: string | null) => void;
}

const TaskDeleteModal: React.FC<TaskDeleteModalProps> = ({
	isOpen,
	onClose,
	selectedTaskId,
	setIsDeleteModalOpen,
	setSelectedTaskId,
}) => {
	const { deleteTask } = useTaskContext();

	const handleDeleteModalConfirm = () => {
		selectedTaskId && deleteTask(selectedTaskId);
		setIsDeleteModalOpen(false);
		setSelectedTaskId(null);
	};

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			aria-labelledby='delete-task-modal-title'
			aria-describedby='delete-task-modal-description'
			closeAfterTransition
		>
			<Fade in={isOpen}>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 400,
						bgcolor: 'background.paper',
						boxShadow: 24,
						borderRadius: 4,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						margin: '0 auto',
						p: 4,
					}}
				>
					<img
						src={TrashIcon}
						alt='Trash'
						style={{ width: 56, margin: '0 auto' }}
					/>
					<Typography variant='h6' gutterBottom>
						Delete Task?
					</Typography>
					<Typography variant='body2' color='textSecondary' paragraph>
						Yo have made changes, are you sure about deleting
						“Task”?
					</Typography>
					<Box>
						<Button
							onClick={onClose}
							variant='outlined'
							color='secondary'
							style={{
								marginRight: 8,
								borderRadius: 32,
								textTransform: 'capitalize',
								width: '30%',
							}}
						>
							Cancel
						</Button>
						<Button
							onClick={handleDeleteModalConfirm}
							variant='contained'
							color='error'
							style={{
								borderRadius: 32,
								textTransform: 'capitalize',
								width: '30%',
							}}
						>
							Delete
						</Button>
					</Box>
				</Box>
			</Fade>
		</Modal>
	);
};

export default TaskDeleteModal;
