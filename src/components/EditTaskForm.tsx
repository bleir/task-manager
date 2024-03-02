import { FC, useState } from 'react';
import {
	TextField,
	Button,
	Card,
	CardActions,
	CardContent,
	FormControl,
	InputLabel,
	MenuItem,
	Typography,
	Select,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../models/Task';
import { returnSelectOptions } from '../utils';

interface IEditTaskForm {
	taskId: string;
}

const EditTaskForm: FC<IEditTaskForm> = ({ taskId }: { taskId?: string }) => {
	const { tasks, updateTask } = useTaskContext();
	const task = tasks.filter((task) => task.id === taskId)[0];
	const navigate = useNavigate();
	const [editedTitle, setEditedTitle] = useState<string>(task.title);
	const [editedDescription, setEditedDescription] = useState<string>(
		task.description
	);

	const [editedStatus, setEditedStatus] = useState<string>(task.status);

	const handleSaveChanges = () => {
		const editedTask: Task = {
			...task,
			title: editedTitle,
			description: editedDescription,
			status: editedStatus,
			history: [
				...task.history,
				{
					status: task.status,
					modifiedAt: new Date(Date.now()),
				},
			],
		};
		updateTask(editedTask.id, editedTask);
		onClose();
	};

	const onClose = () => navigate('/tasks');

	return (
		<Card
			style={{
				padding: 10,
				border: '1px solid #eaeaea',
				borderRadius: 16,
				marginBottom: 20,
			}}
		>
			<CardContent
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Typography
					style={{ marginBottom: 10 }}
					variant='h6'
					color='text.primary'
					sx={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}
				>
					Edit Task
				</Typography>

				<TextField
					InputProps={{ sx: { borderRadius: 28 } }}
					id='outlined-basic'
					label='Title'
					name='title'
					variant='outlined'
					fullWidth
					value={editedTitle}
					onChange={(e) => setEditedTitle(e.target.value)}
				/>

				<TextField
					InputProps={{ sx: { borderRadius: 4 } }}
					id='outlined-multiline-static'
					label='Description'
					name='description'
					fullWidth
					multiline
					rows={10}
					value={editedDescription}
					onChange={(e) => setEditedDescription(e.target.value)}
					style={{ marginTop: '16px' }}
				/>

				<FormControl fullWidth style={{ marginTop: '16px' }}>
					<InputLabel id='status-label'>Status</InputLabel>
					<Select
						labelId='status-label'
						id='status'
						value={editedStatus}
						style={{ borderRadius: 30 }}
						onChange={(e) =>
							setEditedStatus(e.target.value as string)
						}
					>
						{returnSelectOptions(task.status)?.map((item) => (
							<MenuItem key={item} value={item}>
								{item}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</CardContent>
			<CardActions style={{ display: 'flex' }}>
				<Button
					variant='contained'
					// color='primary'
					onClick={handleSaveChanges}
					style={{
						flex: 1,
						borderRadius: 16,
						background: '#000',
						fontSize: 14,
						textTransform: 'capitalize',
					}}
					startIcon={<CheckIcon fontSize='small' />}
				>
					Save Changes
				</Button>
				<Button
					variant='contained'
					// color='primary'
					onClick={onClose}
					style={{
						flex: 1,
						borderRadius: 16,
						background: '#fff',
						color: '#000',
						borderColor: '#D7D9DC',
						fontSize: 14,
						textTransform: 'capitalize',
					}}
				>
					Cancel
				</Button>
			</CardActions>
		</Card>
	);
};

export default EditTaskForm;
