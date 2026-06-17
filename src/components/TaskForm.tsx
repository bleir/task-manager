import { FC, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Snackbar,
} from "@mui/material";
import { useTaskContext } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Alert from "@mui/material/Alert";
import PageIcon from "../public/assets/page_icon.svg";

const TaskForm: FC = () => {
  const { addTask } = useTaskContext();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleAddTask = () => {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      status: "To Do",
      createdAt: new Date(Date.now()),
      history: [],
    };

    if (title !== "" && description !== "") {
      addTask(newTask);
      setTitle("");
      setDescription("");
      navigate("/tasks");
      setSuccess(true);
    }
  };

  const handleClose = (_event: any, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };

  const renderAlert = () => {
    return <Alert severity="success">Task successfully added.</Alert>;
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        mb: 4,
        boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
      }}
    >
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: 3, p: 4 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <img
            src={PageIcon}
            alt="page icon"
            style={{ width: 32, height: 32 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Add a new task
          </Typography>
        </Box>

        <TextField
          label="Title"
          name="title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{ sx: { borderRadius: "32px" } }}
        />

        <TextField
          label="Description"
          name="description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          InputProps={{ sx: { borderRadius: 3 } }}
        />
      </CardContent>

      <CardActions
        sx={{ display: "flex", justifyContent: "flex-end", px: 4, pb: 4 }}
      >
        <Button
          variant="contained"
          onClick={handleAddTask}
          sx={{ borderRadius: 4, px: 4, textTransform: "capitalize" }}
          startIcon={<AddIcon fontSize="small" />}
        >
          Add Task
        </Button>
      </CardActions>

      <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
        {renderAlert()}
      </Snackbar>
    </Card>
  );
};

export default TaskForm;
