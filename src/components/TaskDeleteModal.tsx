import React from "react";
import { Modal, Fade, Box, Typography, Button } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useTaskContext } from "../context/TaskContext";

interface TaskDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTaskId: string | null;
  setIsDeleteModalOpen: (param: boolean) => void;
  setSelectedTaskId: (task: string | null) => void;
}

const TaskDeleteModal: React.FC<TaskDeleteModalProps> = ({
  isOpen,
  onClose,
  selectedTaskId,
  setIsDeleteModalOpen,
  setSelectedTaskId,
}) => {
  const { deleteTask, tasks } = useTaskContext();
  const task = tasks.find((item) => item.id === selectedTaskId);
  const taskTitle = task?.title?.trim() || "this task";

  const handleDeleteModalConfirm = () => {
    if (selectedTaskId) {
      deleteTask(selectedTaskId);
    }
    setIsDeleteModalOpen(false);
    setSelectedTaskId(null);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="delete-task-modal-title"
      aria-describedby="delete-task-modal-description"
      closeAfterTransition
      BackdropProps={{
        sx: { backgroundColor: "rgba(15, 23, 42, 0.5)" },
      }}
    >
      <Fade in={isOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "calc(100% - 32px)", sm: 420 },
            bgcolor: "background.paper",
            boxShadow: "0 24px 70px rgba(15, 23, 42, 0.18)",
            border: "1px solid",
            borderColor: "grey.200",
            borderRadius: 4,
            p: { xs: 3, sm: 4 },
            textAlign: "center",
            outline: "none",
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              mx: "auto",
              mb: 2,
              borderRadius: 3,
              display: "grid",
              placeItems: "center",
              bgcolor: "rgba(244, 67, 54, 0.1)",
              color: "error.main",
            }}
          >
            <DeleteOutlineOutlinedIcon />
          </Box>
          <Typography
            id="delete-task-modal-title"
            variant="h6"
            sx={{ fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            Delete this task?
          </Typography>
          <Typography
            id="delete-task-modal-description"
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, mb: 3, lineHeight: 1.7 }}
          >
            “{taskTitle}” will be removed from the board. This cannot be undone.
          </Typography>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{
                flex: 1,
                borderRadius: 999,
                textTransform: "capitalize",
                borderColor: "grey.300",
                color: "text.primary",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteModalConfirm}
              variant="contained"
              color="error"
              sx={{
                flex: 1,
                borderRadius: 999,
                textTransform: "capitalize",
                boxShadow: "none",
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TaskDeleteModal;
