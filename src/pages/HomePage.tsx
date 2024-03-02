import { FC } from 'react';
import { Box, Avatar, Button, Container, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Photo from '../public/assets/me.jpeg';

const HomePage: FC = () => {
	const navigate = useNavigate();

	const handleCreateButton = () => {
		navigate('/tasks');
	};

	return (
		<Container
			maxWidth='sm'
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'space-between',
				height: '50vh',
				marginTop: 50,
			}}
		>
			<Typography
				variant='h2'
				color='black'
				fontWeight='bold'
				textAlign='center'
			>
				Welcome to Your Task Tool.
			</Typography>
			<Button
				variant='contained'
				color='primary'
				onClick={handleCreateButton}
				style={{ width: '50%' }}
			>
				Create first task
			</Button>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					color: 'gray',
					fontSize: 14,
				}}
			>
				Created by{' '}
				<Link to='https://github.com/bleir'>
					<Avatar
						alt='Adam Salej'
						src={Photo}
						style={{ marginTop: 5 }}
					/>
				</Link>
			</Box>
		</Container>
	);
};

export default HomePage;
