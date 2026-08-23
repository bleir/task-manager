import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Snackbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useLocation, useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import { BreadcrumbsComponent } from "../components/Breadcrumbs";
import { useTaskContext } from "../context/TaskContext";
import { generateChipColor } from "../utils";
import { TaskStatus } from "../types";

const STATUS_ORDER = [
  TaskStatus.toDo,
  TaskStatus.inProgress,
  TaskStatus.blocked,
  TaskStatus.inQa,
  TaskStatus.done,
  TaskStatus.deployed,
];

const TasksPage: React.FC = () => {
  const { tasks } = useTaskContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [createdOpen, setCreatedOpen] = useState(false);

  useEffect(() => {
    const state = location.state as { created?: boolean } | null;

    if (!state?.created) {
      return;
    }

    setCreatedOpen(true);
    navigate("/tasks", { replace: true, state: {} });
  }, [location.state, navigate]);

  const statusCounts = STATUS_ORDER.map((status) => ({
    status,
    count: tasks.filter((task) => task.status === status).length,
  })).filter((item) => item.count > 0);

  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", flexDirection: "column", mt: 6, pb: 8 }}
    >
      <Box
        sx={{
          width: "100%",
          p: { xs: 3, sm: 4 },
          mb: 3,
          borderRadius: 4,
          bgcolor: "background.paper",
          boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
        }}
      >
        <BreadcrumbsComponent currentPage="Board" />
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "stretch", sm: "flex-start" },
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mt: 1,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Task board
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Track what is in motion, what is waiting, and what is already
              delivered.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/tasks/new")}
            sx={{
              borderRadius: 999,
              px: 3,
              textTransform: "capitalize",
              alignSelf: { xs: "stretch", sm: "center" },
              whiteSpace: "nowrap",
            }}
          >
            Add task
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 1,
            mt: 3,
          }}
        >
          <Chip
            label={`${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`}
            sx={{ fontWeight: 600 }}
          />
          {statusCounts.map(({ status, count }) => (
            <Chip
              key={status}
              size="small"
              color={generateChipColor(status)}
              label={`${status} · ${count}`}
              sx={{ fontWeight: 600 }}
            />
          ))}
        </Box>
      </Box>

      <TaskList />

      <Snackbar
        open={createdOpen}
        autoHideDuration={3000}
        onClose={() => setCreatedOpen(false)}
      >
        <Alert severity="success" onClose={() => setCreatedOpen(false)}>
          Task successfully added.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TasksPage;
