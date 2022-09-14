import * as React from "react";
import styled from "styled-components";
import { Task } from "../../ChallengeComponent";
import TaskItem from "../Items/TaskItem";
import MenuList from "@mui/material/MenuList";

interface ITasksListProps {
  list: Task[];
  updateTask: (newTask: Task) => void;
}

const StyledMenuList = styled(MenuList)`
  min-height: 30vh;
  max-height: 30vh;
  overflow: auto;
`;

const TasksList: React.FunctionComponent<ITasksListProps> = (props) => {
  return (
    <StyledMenuList>
      {props.list.map((task: Task, index: number) => (
        <TaskItem key={index} updateTask={props.updateTask} {...task} />
      ))}
    </StyledMenuList>
  );
};

export default TasksList;
