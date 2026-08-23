import { FC } from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import NoTaskIcon from "../public/assets/no_task.svg";

const EmptyTasks: FC = () => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        borderRadius: 4,
        px: 3,
        py: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 20px 50px rgba(15, 23, 42, 0.06)",
      }}
    >
      <img
        src={NoTaskIcon}
        alt="You have no tasks"
        style={{ width: 100, marginBottom: 20 }}
      />
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        The board is empty
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        sx={{ mb: 3, maxWidth: 320 }}
      >
        Create the first task to start planning and tracking work here.
      </Typography>
      <Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/tasks/new")}
          sx={{ borderRadius: 999, px: 3, textTransform: "capitalize" }}
        >
          Create first task
        </Button>
      </Box>
    </Card>
  );
};

export default EmptyTasks;
