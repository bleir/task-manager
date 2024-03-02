import { FC, useState, useRef } from 'react';
import {
	TextField,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
	Snackbar,
} from '@mui/material';
import { useTaskContext } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import PageIcon from '../public/assets/page_icon.svg';
import { theme } from '../theme';

const TaskForm: FC = () => {
	const { addTask } = useTaskContext();
	const navigate = useNavigate();
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLInputElement>(null);
	const [success, setSuccess] = useState<boolean>(false);

	const handleAddTask = () => {
		const newTask = {
			id: Date.now().toString(),
			title,
			description,
			status: 'To Do',
			createdAt: new Date(Date.now()),
			history: [],
		};

		if (title === '' && description === '') {
			setSuccess(true);
		}

		if (title !== '' && description !== '') {
			addTask(newTask);
			setTitle('');
			setDescription('');
			navigate('/tasks');
			setSuccess(true);
		}
	};

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setSuccess(false);
	};

	const renderAlert = () => {
		if (success === null) return;
		if (!success) {
			return <Alert severity='error'>You have to fill all fields.</Alert>;
		} else {
			return <Alert severity='success'>Task successfully added.</Alert>;
		}
	};

	return (
		<>
			<Card
				style={{
					borderRadius: 26,
					marginBottom: 20,
					boxShadow: '0 8px 48px rgba(16, 24, 40, 0.15)',
				}}
			>
				<CardContent
					style={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Typography
						variant='h6'
						color={theme.palette.primary.main}
						style={{
							fontSize: 18,
							fontWeight: 600,
							marginBottom: 20,
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<img
							src={PageIcon}
							alt='page icon'
							style={{ marginRight: 10 }}
						/>
						Add a new Task
					</Typography>

					<TextField
						InputProps={{
							sx: {
								borderRadius: 28,
							},
						}}
						id='outlined-basic'
						label='Title'
						name='title'
						variant='outlined'
						fullWidth
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						ref={titleRef}
					/>

					<TextField
						InputProps={{ sx: { borderRadius: 4 } }}
						id='outlined-multiline-static'
						label='Description'
						name='description'
						fullWidth
						multiline
						rows={4}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						style={{ marginTop: '16px' }}
						ref={descriptionRef}
					/>
				</CardContent>

				<CardActions
					style={{ display: 'flex', justifyContent: 'flex-end' }}
				>
					<Button
						variant='contained'
						onClick={handleAddTask}
						style={{
							marginRight: 20,
							margin: 0,
							borderRadius: 16,
							fontSize: 14,
							textTransform: 'capitalize',
							background: theme.palette.primary.main,
						}}
						startIcon={<AddIcon fontSize='small' />}
					>
						Add
					</Button>
				</CardActions>
				<Snackbar
					open={success}
					autoHideDuration={3000}
					onClose={handleClose}
				>
					{renderAlert()}
				</Snackbar>
			</Card>
		</>
	);
};

export default TaskForm;
