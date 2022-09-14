import React from "react";
import { Tooltip } from "@mui/material";
import styled from "styled-components";

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(
  ({ color }) => `
      & .MuiTooltip-tooltip {
          background: ${color};
      }
      `
);

export default StyledTooltip;
