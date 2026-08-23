import { FC, useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Chip,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import { BreadcrumbsComponent } from "./Breadcrumbs";
import { generateChipColor } from "../utils";

const STEPS = [
  {
    title: "Name it",
    description: "A short title that is obvious in the list.",
  },
  {
    title: "Add context",
    description: "What needs to happen, and why it matters.",
  },
  {
    title: "Send it to the board",
    description: "New work always starts in To Do.",
  },
];

const TaskForm: FC = () => {
  const { addTask } = useTaskContext();
  const navigate = useNavigate();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const canSubmit = title.trim() !== "" && description.trim() !== "";

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const handleAddTask = () => {
    if (!canSubmit) {
      return;
    }

    addTask({
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      status: "To Do",
      createdAt: new Date(Date.now()),
      history: [],
    });

    navigate("/tasks", { state: { created: true } });
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
      <BreadcrumbsComponent currentPage="New" />
      <Chip
        label="Starts as To Do"
        size="small"
        color="default"
        sx={{ mt: 1, mb: 2, fontWeight: 600 }}
      />
      <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: "-0.03em" }}>
        Capture the next piece of work.
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 4, maxWidth: 520 }}>
        Give it a clear title and enough context to pick up later. It will land
        on the board in To Do.
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
              <AssignmentOutlinedIcon fontSize="small" />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700 }}>Task details</Typography>
              <Typography variant="body2" color="text.secondary">
                Both fields are needed before you can add it.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              fullWidth
              inputRef={titleInputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Unblock checkout QA"
              InputProps={{ sx: { borderRadius: 3 } }}
            />

            <TextField
              label="Description"
              name="description"
              variant="outlined"
              fullWidth
              multiline
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What should happen next, and who is waiting on it?"
              InputProps={{ sx: { borderRadius: 3 } }}
            />
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
              onClick={handleAddTask}
              disabled={!canSubmit}
              sx={{ borderRadius: 999, px: 4, textTransform: "capitalize" }}
              startIcon={<AddIcon fontSize="small" />}
            >
              Add to board
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
            <Chip size="small" label="Live" sx={{ bgcolor: "background.paper" }} />
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
              <Typography sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                {title.trim() || "Untitled task"}
              </Typography>
              <Chip size="small" color={generateChipColor("To Do")} label="To Do" />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: 12,
                color: "text.secondary",
                mb: 1,
              }}
            >
              <AccessTimeIcon fontSize="small" sx={{ mr: 0.75 }} />
              Created: {format(new Date(), "MMM dd, yyyy - h:mm aaa")}
            </Box>
            <Typography variant="body2" color="text.secondary">
              {description.trim() ||
                "The description will appear here as you type."}
            </Typography>
          </Box>

          <Box sx={{ display: "grid", gap: 1.5 }}>
            {STEPS.map((step, index) => (
              <Box key={step.title} sx={{ display: "flex", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    flexShrink: 0,
                    display: "grid",
                    placeItems: "center",
                    bgcolor: "primary.main",
                    color: "common.white",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {index + 1}
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskForm;
