import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
export const VisuallyHiddenInput = styled("input")({
  display: "none",
});

export const Link = styled(LinkComponent)({
  textDecoration: "none",
  width: "100%",
  
});
