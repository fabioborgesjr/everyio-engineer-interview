import React, { useCallback } from "react";
import styled from "styled-components";
import SectionsEnum from "../../utils/SectionsEnum";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Task } from "../../ChallengeComponent";
import StyledTooltip from "../Tooltips/StyledTooltip";

const StyledMenuItem = styled(MenuItem)`
  text-align: center;
  display: flex !important;
  justify-content: space-between !important;
`;

const StyledButton = styled(Button)(
  (props) => `
    // & > svg {
    //   fill: ${props.color}
    // }
  `
);

interface ITaskItemProps {
  id: number;
  name: string;
  sectionId: SectionsEnum;
  updateTask: (newTask: Task) => void;
}

const TaskItem: React.FunctionComponent<ITaskItemProps> = ({
  id,
  name,
  sectionId,
  updateTask,
}: ITaskItemProps) => {
  const theme = useTheme();

  const handleSectionChange = useCallback(
    (direction) => {
      let nextSection: SectionsEnum = sectionId;

      if (direction === "previous" && sectionId !== SectionsEnum.Todo) {
        nextSection =
          sectionId - 1 === 0 ? SectionsEnum.Todo : SectionsEnum.InProgress;
      } else if (direction === "next" && sectionId !== SectionsEnum.Done) {
        nextSection =
          sectionId + 1 === 2 ? SectionsEnum.Done : SectionsEnum.InProgress;
      }

      updateTask({ id, name, sectionId: nextSection });
    },
    [id, name, sectionId, updateTask]
  );

  const moveToPreviousSection = useCallback(
    (e) => {
      handleSectionChange("previous");
    },
    [handleSectionChange]
  );

  const moveToNextSection = useCallback(
    (e) => {
      handleSectionChange("next");
    },
    [handleSectionChange]
  );

  return (
    <StyledMenuItem>
      <StyledTooltip
        title={
          sectionId !== SectionsEnum.Todo
            ? `Move to ${
                sectionId === SectionsEnum.InProgress ? "To Do" : "In Progress"
              }`
            : ""
        }
        color="error"
      >
        <span>
          <StyledButton
            disabled={sectionId === SectionsEnum.Todo}
            onClick={moveToPreviousSection}
            theme={theme}
            color="error"
            variant="contained"
          >
            <ArrowBack />
          </StyledButton>
        </span>
      </StyledTooltip>
      <StyledTooltip title={name}>
        <Typography sx={{ maxWidth: 1 / 2 }} align="center" noWrap>
          {name}
        </Typography>
      </StyledTooltip>
      <StyledTooltip
        title={
          sectionId !== SectionsEnum.Done
            ? `Move to ${
                sectionId === SectionsEnum.InProgress ? "Done" : "In Progress"
              }`
            : ""
        }
        color="error"
      >
        <span>
          <StyledButton
            disabled={sectionId === SectionsEnum.Done}
            onClick={moveToNextSection}
            theme={theme}
            color="success"
            variant="contained"
          >
            <ArrowForward />
          </StyledButton>
        </span>
      </StyledTooltip>
    </StyledMenuItem>
  );
};

export default TaskItem;
