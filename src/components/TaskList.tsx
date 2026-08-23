import { FC, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { useTaskContext } from "../context/TaskContext";
import TaskHistoryModal from "./TaskHistoryModal";
import TaskDeleteModal from "./TaskDeleteModal";
import EmptyTasks from "./EmptyTasks";
import { generateChipColor } from "../utils";

const TaskList: FC = () => {
  const { tasks } = useTaskContext();
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleHistoryModalClose = () => {
    setIsHistoryModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedTaskId(null);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedTaskId(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsDeleteModalOpen(true);
  };

  const handleEditTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    navigate(`/tasks/edit/${taskId}`);
  };

  const handleViewHistory = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsHistoryModalOpen(true);
  };

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    taskId: string,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);
  };

  const handleMenuAction = (
    taskId: string,
    action: "edit" | "delete" | "history",
  ) => {
    handleCloseMenu();
    switch (action) {
      case "delete":
        handleDeleteTask(taskId);
        break;
      case "edit":
        handleEditTask(taskId);
        break;
      case "history":
        handleViewHistory(taskId);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Box sx={{ display: "grid", gap: 2 }}>
        {tasks.length > 0 ? (
          tasks.map((task) => {
            return (
              <Card
                key={task.id}
                sx={{
                  borderRadius: 4,
                  boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)",
                  transition: "transform 180ms ease, box-shadow 180ms ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 20px 48px rgba(15, 23, 42, 0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 2,
                      mb: 1.25,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: 18, sm: 20 },
                        letterSpacing: "-0.02em",
                        lineHeight: 1.3,
                        pr: 1,
                      }}
                    >
                      {task.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Chip
                        color={generateChipColor(task.status)}
                        label={task.status}
                        sx={{ fontWeight: 600 }}
                      />
                      <IconButton
                        aria-label="options"
                        aria-controls={`options-menu-${task.id}`}
                        aria-haspopup="true"
                        onClick={(event) => handleOpenMenu(event, task.id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id={`options-menu-${task.id}`}
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && selectedTaskId === task.id}
                        onClose={handleCloseMenu}
                      >
                        <MenuItem
                          onClick={() => handleMenuAction(task.id, "history")}
                        >
                          <InsertInvitationOutlinedIcon
                            fontSize="small"
                            style={{
                              marginRight: 10,
                              color: "#B4B5B8",
                            }}
                          />
                          Task History
                        </MenuItem>
                        {task.status !== "Deployed" && (
                          <MenuItem
                            onClick={() => handleMenuAction(task.id, "edit")}
                          >
                            <EditOutlinedIcon
                              fontSize="small"
                              style={{
                                marginRight: 10,
                                color: "#B4B5B8",
                              }}
                            />
                            Edit Task
                          </MenuItem>
                        )}
                        <MenuItem
                          onClick={() => handleMenuAction(task.id, "delete")}
                          style={{ color: "red" }}
                        >
                          <DeleteOutlineOutlinedIcon
                            fontSize="small"
                            style={{
                              marginRight: 10,
                              color: "#B4B5B8",
                            }}
                          />
                          Delete Task
                        </MenuItem>
                      </Menu>
                    </Box>
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
                    <Typography variant="caption" sx={{ letterSpacing: "0.01em" }}>
                      Created {format(task.createdAt, "MMM dd, yyyy · h:mm aaa")}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: 15,
                      lineHeight: 1.7,
                      letterSpacing: "0.01em",
                      maxWidth: 640,
                    }}
                  >
                    {task.description}
                  </Typography>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <EmptyTasks />
        )}
      </Box>

      <TaskHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={handleHistoryModalClose}
        task={
          tasks.find((task) => task.id === selectedTaskId) || {
            id: "",
            title: "",
            description: "",
            createdAt: new Date(Date.now()),
            status: "",
            history: [],
          }
        }
      />

      <TaskDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        selectedTaskId={selectedTaskId}
        setSelectedTaskId={setSelectedTaskId}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
    </>
  );
};

export default TaskList;
