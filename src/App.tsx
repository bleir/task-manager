import { BrowserRouter as Router } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import AppRoutes from './routes';

export default function App() {
	return (
		<TaskProvider>
			<Router>
				<AppRoutes />
			</Router>
		</TaskProvider>
	);
}
