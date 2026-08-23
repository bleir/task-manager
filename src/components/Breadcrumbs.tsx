import { FC } from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { theme } from "../theme";

interface IBreadcrumbsComponent {
  currentPage: "Board" | "New" | "Edit";
}

const linkStyle = {
  color: theme.palette.primary.main,
  textDecoration: "none",
};

export const BreadcrumbsComponent: FC<IBreadcrumbsComponent> = ({
  currentPage,
}) => {
  const currentLabel =
    currentPage === "New"
      ? "New task"
      : currentPage === "Board"
        ? "Board"
        : "Edit";

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      style={{ marginBottom: 10 }}
    >
      <Typography color="text.primary">
        <Link to="/" style={linkStyle}>
          Task Management
        </Link>
      </Typography>
      {currentPage !== "Board" && (
        <Typography>
          <Link to="/tasks" style={linkStyle}>
            Board
          </Link>
        </Typography>
      )}
      <Typography color="text.secondary">{currentLabel}</Typography>
    </Breadcrumbs>
  );
};
