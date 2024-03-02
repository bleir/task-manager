import { FC } from 'react';
import { format } from 'date-fns';
import {
	Modal,
	Fade,
	Box,
	Typography,
	List,
	ListItem,
	ListItemText,
} from '@mui/material';
import { Task } from '../models/Task';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface TaskHistoryModalProps {
	isOpen: boolean;
	onClose: () => void;
	task: Task;
}

const TaskHistoryModal: FC<TaskHistoryModalProps> = ({
	isOpen,
	onClose,
	task,
}) => {
	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			aria-labelledby='transition-modal-title'
			aria-describedby='transition-modal-description'
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
						p: 4,
					}}
				>
					<Typography variant='h6' gutterBottom>
						Task History
					</Typography>
					<List>
						{task.history.map((change, index) => (
							<ListItem
								key={index}
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-start',
								}}
							>
								<ListItemText>
									The task was marked as “{change.status}”
								</ListItemText>
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
									{format(
										change.modifiedAt,
										'MMM dd, yyyy - h:m aaa'
									)}
								</div>
							</ListItem>
						))}
					</List>
				</Box>
			</Fade>
		</Modal>
	);
};

export default TaskHistoryModal;
