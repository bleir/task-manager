import { FC } from "react";
import { Box, Avatar, Button, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Photo from "../public/assets/me.jpeg";

const HomePage: FC = () => {
  const navigate = useNavigate();

  const handleCreateButton = () => {
    navigate("/tasks");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 64px)",
        py: 6,
      }}
    >
      <Box
        sx={{
          width: "100%",
          p: { xs: 4, sm: 6 },
          borderRadius: 4,
          bgcolor: "background.paper",
          boxShadow: "0 24px 70px rgba(15, 23, 42, 0.08)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          color="text.primary"
          sx={{
            fontWeight: 800,
            mb: 2,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          Welcome to your task tool.
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 520, mx: "auto" }}
        >
          A clean task board for planning, tracking, and delivering work with a
          simple and modern dashboard.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleCreateButton}
          sx={{ borderRadius: 999, px: 6, textTransform: "capitalize" }}
        >
          Create first task
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          color: "text.secondary",
          typography: "body2",
          mt: 5,
        }}
      >
        <Typography>Created by</Typography>
        <Link to="https://github.com/bleir">
          <Avatar alt="Adam Salej" src={Photo} sx={{ width: 42, height: 42 }} />
        </Link>
      </Box>
    </Container>
  );
};

export default HomePage;
