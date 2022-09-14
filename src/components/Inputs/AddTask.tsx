import * as React from "react";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Task } from "../../ChallengeComponent";
import Sections from "../../utils/SectionsEnum";
import StyledTooltip from "../Tooltips/StyledTooltip";

const Form = styled.form`
  margin: 20px 20px 24px;
  display: flex;
  alignitems: center;
`;

interface IAddTaskProps {
  onSubmit: (newTask: Task) => void;
  nextTaskId: number;
}

const AddTask: React.FunctionComponent<IAddTaskProps> = ({
  onSubmit,
  nextTaskId,
}: IAddTaskProps) => {
  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const target = e.target as typeof e.target & {
        taskName: { value: string };
      };

      const newTask = target.taskName.value;

      if (newTask.length) {
        target.taskName.value = "";

        onSubmit({
          id: nextTaskId,
          name: newTask,
          sectionId: Sections.Todo,
        });
      }
    },
    [onSubmit, nextTaskId]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        name="taskName"
        placeholder="Add Task"
        variant="outlined"
        autoFocus
        autoComplete="off"
      />
      <StyledTooltip title="Add task" color="primary">
        <Button
          color="primary"
          type="submit"
          variant="contained"
          sx={{ marginLeft: 2 }}
        >
          <Add />
        </Button>
      </StyledTooltip>
    </Form>
  );
};

export default AddTask;
