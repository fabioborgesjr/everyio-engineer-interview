import * as React from "react";
import styled from "styled-components";
import { Task } from "../../ChallengeComponent";
import TasksList from "../Lists/TasksList";

interface IColumnCardProps {
  title: string;
  tasks: Task[];
  updateTask: (newTask: Task) => void;
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 2px solid rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin: 16px;
  text-align: center;
  min-height: 50vh;

  @media (max-width: 768px) {
    min-width: calc(100% - 32px);
  }
`;

const ColumnCard: React.FunctionComponent<IColumnCardProps> = (props) => {
  return (
    <Container>
      <h2>{props.title}</h2>
      <br />
      <TasksList list={props.tasks} updateTask={props.updateTask} />
    </Container>
  );
};

export default ColumnCard;
