import React from "react";
import { Box, Container } from "@mui/material";
import TaskForm from "../components/TaskForm";

const NewTaskPage: React.FC = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        mt: { xs: 4, sm: 6 },
        pb: 8,
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: 8,
          right: { xs: -40, md: 48 },
          width: 240,
          height: 240,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(9, 69, 235, 0.14), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <TaskForm />
    </Container>
  );
};

export default NewTaskPage;
