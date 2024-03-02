import { FC } from 'react';
import { Card, Typography } from '@mui/material';
import NoTaskIcon from '../public/assets/no_task.svg';
import { theme } from '../theme';

const EmptyTasks: FC = () => (
	<Card
		style={{
			border: '1px solid #eaeaea',
			borderRadius: 26,
			padding: 20,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		}}
	>
		<img
			src={NoTaskIcon}
			alt='You have no tasks'
			style={{ width: 100, marginBottom: 20 }}
		/>
		<Typography
			variant='subtitle2'
			color={theme.palette.grey[600]}
			textAlign='center'
		>
			You have nothing to do.
			<br /> Go get some sleep!
		</Typography>
	</Card>
);

export default EmptyTasks;
