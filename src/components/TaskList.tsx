import { FC, useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import {
	Card,
	CardContent,
	Chip,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Menu,
	MenuItem,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { useTaskContext } from '../context/TaskContext';
import TaskHistoryModal from './TaskHistoryModal';
import TaskDeleteModal from './TaskDeleteModal';
import EmptyTasks from './EmptyTasks';
import { generateChipColor } from '../utils';

const TaskList: FC = () => {
	const { tasks } = useTaskContext();
	const [isHistoryModalOpen, setIsHistoryModalOpen] =
		useState<boolean>(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleHistoryModalClose = () => {
		setIsHistoryModalOpen(false);
	};

	const handleDeleteModalClose = () => {
		setIsDeleteModalOpen(false);
		setSelectedTaskId(null);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
		setSelectedTaskId(null);
	};

	const handleDeleteTask = (taskId: string) => {
		setSelectedTaskId(taskId);
		setIsDeleteModalOpen(true);
	};

	const handleEditTask = (taskId: string) => {
		setSelectedTaskId(taskId);
		navigate(`/tasks/edit/${taskId}`);
	};

	const handleViewHistory = (taskId: string) => {
		setSelectedTaskId(taskId);
		setIsHistoryModalOpen(true);
	};

	const handleOpenMenu = (
		event: React.MouseEvent<HTMLElement>,
		taskId: string
	) => {
		setAnchorEl(event.currentTarget);
		setSelectedTaskId(taskId);
	};

	const handleMenuAction = (
		taskId: string,
		action: 'edit' | 'delete' | 'history'
	) => {
		handleCloseMenu();
		switch (action) {
			case 'delete':
				handleDeleteTask(taskId);
				break;
			case 'edit':
				handleEditTask(taskId);
				break;
			case 'history':
				handleViewHistory(taskId);
				break;
			default:
				break;
		}
	};

	return (
		<>
			<List style={{ marginTop: 10 }}>
				{tasks.length > 0 ? (
					tasks.map((task) => {
						return (
							<Card
								key={task.id}
								style={{
									borderRadius: 16,
									marginBottom: 20,
									boxShadow:
										'0 8px 48px rgba(16, 24, 40, 0.15)',
								}}
							>
								<CardContent style={{ padding: 10 }}>
									<ListItem
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											padding: 10,
										}}
									>
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
											}}
										>
											<ListItemText
												primary={task.title}
											/>

											<div
												style={{
													display: 'flex',
													alignItems: 'center',
													fontSize: 12,
													color: '#949598',
												}}
											>
												<AccessTimeIcon
													fontSize='small'
													style={{ marginRight: 5 }}
												/>
												Created:
												{format(
													task.createdAt,
													'MMM dd, yyyy - h:m aaa'
												)}
											</div>
											<div>{task.description}</div>
										</div>

										<div>
											<Chip
												color={generateChipColor(
													task.status
												)}
												label={task.status}
											/>

											<IconButton
												aria-label='options'
												aria-controls={`options-menu-${task.id}`}
												aria-haspopup='true'
												onClick={(event) =>
													handleOpenMenu(
														event,
														task.id
													)
												}
											>
												<MoreVertIcon />
											</IconButton>

											<Menu
												id={`options-menu-${task.id}`}
												anchorEl={anchorEl}
												open={
													Boolean(anchorEl) &&
													selectedTaskId === task.id
												}
												onClose={handleCloseMenu}
											>
												<MenuItem
													onClick={() =>
														handleMenuAction(
															task.id,
															'history'
														)
													}
												>
													<InsertInvitationOutlinedIcon
														fontSize='small'
														style={{
															marginRight: 10,
															color: '#B4B5B8',
														}}
													/>
													Task History
												</MenuItem>
												{task.status !== 'Deployed' && (
													<MenuItem
														onClick={() =>
															handleMenuAction(
																task.id,
																'edit'
															)
														}
													>
														<EditOutlinedIcon
															fontSize='small'
															style={{
																marginRight: 10,
																color: '#B4B5B8',
															}}
														/>
														Edit Task
													</MenuItem>
												)}

												<MenuItem
													onClick={() =>
														handleMenuAction(
															task.id,
															'delete'
														)
													}
													style={{ color: 'red' }}
												>
													<DeleteOutlineOutlinedIcon
														fontSize='small'
														style={{
															marginRight: 10,
															color: '#B4B5B8',
														}}
													/>
													Delete Task
												</MenuItem>
											</Menu>
										</div>
									</ListItem>
								</CardContent>
							</Card>
						);
					})
				) : (
					<EmptyTasks />
				)}
			</List>

			<TaskHistoryModal
				isOpen={isHistoryModalOpen}
				onClose={handleHistoryModalClose}
				task={
					tasks.find((task) => task.id === selectedTaskId) || {
						id: '',
						title: '',
						description: '',
						createdAt: new Date(Date.now()),
						status: '',
						history: [],
					}
				}
			/>

			<TaskDeleteModal
				isOpen={isDeleteModalOpen}
				onClose={handleDeleteModalClose}
				selectedTaskId={selectedTaskId}
				setSelectedTaskId={setSelectedTaskId}
				setIsDeleteModalOpen={setIsDeleteModalOpen}
			/>
		</>
	);
};

export default TaskList;
