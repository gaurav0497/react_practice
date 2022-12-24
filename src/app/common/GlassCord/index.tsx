import { FC, ReactNode } from "react";
import { Paper } from "@mui/material";

interface Props {
  elevation?: number;
  children: ReactNode;
  sx?: any;
}

const GlassCard: FC<Props> = ({ elevation = 8, children, sx = {} }) => {
  return (
    <Paper
      sx={{
        p: 4,
        border: "none",
        bgcolor: "transparent",
        backdropFilter: "blur(40px)",
        backgroundImage:
          "linear-gradient(135deg,rgb(255 255 255 / 30%) 0%,rgb(0 0 0 / 0%) 100%)",
        textShadow: "0 1px rgb(0 0 0 /  5%)",
        ...sx,
      }}
      elevation={elevation}
    >
      {children}
    </Paper>
  );
};

export default GlassCard;
