import React from "react";
import { Typography, Container, Box } from "@mui/material";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { BreadcrumbsComponent } from "../components/Breadcrumbs";

const TasksPage: React.FC = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", flexDirection: "column", mt: 6, pb: 8 }}
    >
      <Box
        sx={{
          width: "100%",
          p: { xs: 3, sm: 4 },
          mb: 4,
          borderRadius: 4,
          bgcolor: "background.paper",
          boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
        }}
      >
        <BreadcrumbsComponent currentPage="Home" />
        <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
          Task board
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Organize your work with clear priorities, reliable status updates, and
          a more focused task workflow.
        </Typography>
      </Box>

      <TaskForm />

      <TaskList />
    </Container>
  );
};

export default TasksPage;
