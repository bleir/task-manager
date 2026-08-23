import { FC } from "react";
import { Box, Button, Chip, Container, Typography } from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import { useNavigate } from "react-router-dom";
import { generateChipColor } from "../utils";

const WORKFLOW = ["To Do", "In Progress", "In QA", "Done", "Deployed"];

const PREVIEW_TASKS = [
  {
    title: "Map this week's priorities",
    description: "Keep the next actions visible before the standup.",
    status: "To Do",
  },
  {
    title: "Unblock checkout QA",
    description: "Move the review forward so release stays on track.",
    status: "In Progress",
  },
  {
    title: "Share the release notes",
    description: "Close the loop after the work is deployed.",
    status: "Done",
  },
];

const FEATURES = [
  {
    title: "Plan the work",
    description:
      "Capture a title and a clear description so every task starts with a next step.",
    icon: AssignmentOutlinedIcon,
  },
  {
    title: "Track every status",
    description:
      "Move work through To Do, In Progress, QA, Done, and Deployed without losing context.",
    icon: TimelineOutlinedIcon,
  },
  {
    title: "Keep a history",
    description:
      "Open the timeline for any task when you need to see what changed and when.",
    icon: HistoryOutlinedIcon,
  },
];

const HomePage: FC = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: { xs: 2, sm: 4 },
        pb: { xs: 6, sm: 8 },
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: 24,
          right: { xs: -40, md: 40 },
          width: 260,
          height: 260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(9, 69, 235, 0.14), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          alignSelf: "flex-start",
          mb: { xs: 3, sm: 4 },
        }}
      >
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: 2,
            bgcolor: "primary.main",
            display: "grid",
            placeItems: "center",
          }}
        >
          <CheckRoundedIcon sx={{ color: "common.white", fontSize: 18 }} />
        </Box>
        <Typography sx={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
          Task Management
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          bgcolor: "background.paper",
          boxShadow: "0 24px 70px rgba(15, 23, 42, 0.08)",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
            gap: { xs: 4, md: 5 },
            alignItems: "center",
          }}
        >
          <Box>
            <Chip
              label="Simple board. Clear progress."
              size="small"
              sx={{
                mb: 2.5,
                bgcolor: "rgba(9, 69, 235, 0.08)",
                color: "secondary.main",
                fontWeight: 600,
              }}
            />
            <Typography
              variant="h2"
              color="text.primary"
              sx={{
                fontWeight: 800,
                mb: 2,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                fontSize: { xs: 36, sm: 44, md: 48 },
              }}
            >
              Welcome to your task tool.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3.5, maxWidth: 460 }}
            >
              A clean task board for planning, tracking, and delivering work
              with a simple and modern dashboard.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1.5,
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/tasks/new")}
                sx={{ borderRadius: 999, px: 4, textTransform: "capitalize" }}
              >
                Create first task
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/tasks")}
                sx={{
                  borderRadius: 999,
                  px: 3.5,
                  textTransform: "capitalize",
                  borderColor: "grey.300",
                  color: "text.primary",
                }}
              >
                Open the board
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
              <Typography sx={{ fontWeight: 700 }}>Today's board</Typography>
              <Chip
                icon={<RocketLaunchOutlinedIcon sx={{ fontSize: 16 }} />}
                label="3 tasks"
                size="small"
                sx={{ bgcolor: "background.paper" }}
              />
            </Box>
            <Box sx={{ display: "grid", gap: 1.5 }}>
              {PREVIEW_TASKS.map((task) => (
                <Box
                  key={task.title}
                  sx={{
                    p: 2,
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
                      mb: 0.75,
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                      {task.title}
                    </Typography>
                    <Chip
                      size="small"
                      color={generateChipColor(task.status)}
                      label={task.status}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {task.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 1,
            mt: { xs: 3.5, md: 4 },
            pt: { xs: 3, md: 3.5 },
            borderTop: "1px solid",
            borderColor: "grey.200",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mr: 0.5, fontWeight: 600 }}
          >
            Workflow
          </Typography>
          {WORKFLOW.map((status, index) => (
            <Box
              key={status}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Chip
                size="small"
                color={generateChipColor(status)}
                label={status}
                sx={{ fontWeight: 600 }}
              />
              {index < WORKFLOW.length - 1 && (
                <Box
                  sx={{
                    width: 16,
                    height: 2,
                    bgcolor: "grey.300",
                    display: { xs: "none", sm: "block" },
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          mt: 3,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: 2,
        }}
      >
        {FEATURES.map((feature) => {
          const Icon = feature.icon;

          return (
            <Box
              key={feature.title}
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: "background.paper",
                boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)",
                transition: "transform 180ms ease, box-shadow 180ms ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 20px 48px rgba(15, 23, 42, 0.1)",
                },
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  mb: 2,
                  borderRadius: 2,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "rgba(9, 69, 235, 0.08)",
                  color: "secondary.main",
                }}
              >
                <Icon fontSize="small" />
              </Box>
              <Typography sx={{ fontWeight: 700, mb: 1 }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default HomePage;
