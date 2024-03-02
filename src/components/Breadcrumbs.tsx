import { FC } from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { theme } from '../theme';

interface IBreadcrumbsComponent {
	currentPage: 'Home' | 'Edit';
}

export const BreadcrumbsComponent: FC<IBreadcrumbsComponent> = ({
	currentPage,
}) => {
	return (
		<Breadcrumbs
			separator={<NavigateNextIcon fontSize='small' />}
			aria-label='breadcrumb'
			style={{ marginBottom: 10 }}
		>
			<Typography key='1' color='text.primary'>
				<Link
					to='/'
					style={{
						color: theme.palette.primary.main,
						textDecoration: 'none',
					}}
				>
					Task Management
				</Link>
			</Typography>
			,
			<Typography key='2' color='text.secondary'>
				{currentPage}
			</Typography>
		</Breadcrumbs>
	);
};
