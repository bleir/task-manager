import { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import { Task } from "../models/Task";
import { generateChipColor, returnSelectOptions } from "../utils";
import { BreadcrumbsComponent } from "./Breadcrumbs";

interface IEditTaskForm {
  taskId: string;
}

const EditTaskForm: FC<IEditTaskForm> = ({ taskId }) => {
  const { tasks, updateTask } = useTaskContext();
  const task = tasks.find((item) => item.id === taskId);
  const navigate = useNavigate();
  const [editedTitle, setEditedTitle] = useState(task?.title ?? "");
  const [editedDescription, setEditedDescription] = useState(
    task?.description ?? "",
  );
  const [editedStatus, setEditedStatus] = useState(task?.status ?? "");

  useEffect(() => {
    if (!task) {
      navigate("/tasks");
    }
  }, [navigate, task]);

  if (!task) {
    return null;
  }

  const statusOptions = returnSelectOptions(task.status) ?? [task.status];
  const hasChanges =
    editedTitle.trim() !== task.title ||
    editedDescription.trim() !== task.description ||
    editedStatus !== task.status;
  const canSave =
    editedTitle.trim() !== "" && editedDescription.trim() !== "" && hasChanges;
  const statusChanged = editedStatus !== task.status;

  const handleSaveChanges = () => {
    if (!canSave) {
      return;
    }

    const editedTask: Task = {
      ...task,
      title: editedTitle.trim(),
      description: editedDescription.trim(),
      status: editedStatus,
      history: statusChanged
        ? [
            ...task.history,
            {
              status: task.status,
              modifiedAt: new Date(Date.now()),
            },
          ]
        : task.history,
    };

    updateTask(editedTask.id, editedTask);
    navigate("/tasks");
  };

  return (
    <Box
      sx={{
        width: "100%",
        p: { xs: 3, sm: 4 },
        borderRadius: 4,
        bgcolor: "background.paper",
        boxShadow: "0 24px 70px rgba(15, 23, 42, 0.08)",
      }}
    >
      <BreadcrumbsComponent currentPage="Edit" />
      <Chip
        label={editedStatus}
        size="small"
        color={generateChipColor(editedStatus)}
        sx={{ mt: 1, mb: 2, fontWeight: 600 }}
      />
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, letterSpacing: "-0.03em" }}
      >
        Update this task.
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1, mb: 4, maxWidth: 520 }}
      >
        Adjust the title, description, or move it to the next status. Changes
        appear on the board as soon as you save.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
          gap: { xs: 4, md: 5 },
          alignItems: "start",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                display: "grid",
                placeItems: "center",
                bgcolor: "rgba(9, 69, 235, 0.08)",
                color: "secondary.main",
              }}
            >
              <EditOutlinedIcon fontSize="small" />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700 }}>Task details</Typography>
              <Typography variant="body2" color="text.secondary">
                Title and description are required to save.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              fullWidth
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              InputProps={{ sx: { borderRadius: 3 } }}
            />

            <TextField
              label="Description"
              name="description"
              variant="outlined"
              fullWidth
              multiline
              rows={5}
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              InputProps={{ sx: { borderRadius: 3 } }}
            />

            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                label="Status"
                value={editedStatus}
                onChange={(e) => setEditedStatus(e.target.value as string)}
                sx={{ borderRadius: 3 }}
              >
                {statusOptions.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexWrap: "wrap",
              gap: 1.5,
              mt: 3,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate("/tasks")}
              sx={{
                borderRadius: 999,
                px: 3,
                textTransform: "capitalize",
                borderColor: "grey.300",
                color: "text.primary",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveChanges}
              disabled={!canSave}
              sx={{ borderRadius: 999, px: 4, textTransform: "capitalize" }}
              startIcon={<CheckIcon fontSize="small" />}
            >
              Save changes
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            p: { xs: 2, sm: 2.5 },
            borderRadius: 3,
            bgcolor: "grey.50",
            border: "1px solid",
            borderColor: "grey.200",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>Board preview</Typography>
            <Chip
              size="small"
              label={hasChanges ? "Unsaved" : "Saved"}
              sx={{ bgcolor: "background.paper" }}
            />
          </Box>

          <Box
            sx={{
              p: 2.5,
              mb: 2.5,
              borderRadius: 3,
              bgcolor: "background.paper",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 1.5,
                mb: 1,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 18,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.3,
                }}
              >
                {editedTitle.trim() || "Untitled task"}
              </Typography>
              <Chip
                size="small"
                color={generateChipColor(editedStatus)}
                label={editedStatus}
                sx={{ fontWeight: 600 }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
                mb: 1.5,
              }}
            >
              <AccessTimeIcon sx={{ fontSize: 16, mr: 0.75 }} />
              <Typography variant="caption">
                Created {format(task.createdAt, "MMM dd, yyyy · h:mm aaa")}
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 15,
                lineHeight: 1.7,
              }}
            >
              {editedDescription.trim() ||
                "The description will appear here as you type."}
            </Typography>
          </Box>

          <Typography sx={{ fontWeight: 600, mb: 1 }}>Next status</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            {statusChanged
              ? `This save will move the task from ${task.status} to ${editedStatus} and add it to history.`
              : "Keep the current status, or move it forward when the work is ready."}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {statusOptions.map((status) => (
              <Chip
                key={status}
                size="small"
                color={generateChipColor(status)}
                label={status}
                variant={status === editedStatus ? "filled" : "outlined"}
                sx={{ fontWeight: 600 }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditTaskForm;
