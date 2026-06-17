import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { TaskProvider } from "./context/TaskContext";
import AppRoutes from "./routes";
import { theme } from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top, rgba(9, 69, 235, 0.12), transparent 30%), #F8F8FF",
          py: { xs: 4, sm: 6 },
          px: { xs: 2, sm: 4 },
        }}
      >
        <TaskProvider>
          <Router>
            <AppRoutes />
          </Router>
        </TaskProvider>
      </Box>
    </ThemeProvider>
  );
}
