import React, { useCallback, useState, useMemo } from "react";
import ColumnCard from "./components/Cards/ColumnCard";
import styled from "styled-components";
import AddTask from "./components/Inputs/AddTask";
import SectionsEnum from "./utils/SectionsEnum";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  min-height: 50vh;
`;

const Columns = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  min-width: 100%;
  min-height: 100%;
  flex-wrap: wrap;
`;

export interface Task {
  id: number;
  name: string;
  sectionId: SectionsEnum;
}

const filterTasksBySection = (tasks: Task[], section: SectionsEnum) => {
  return tasks.filter((task) => task.sectionId === section);
};

export function ChallengeComponent() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleNewTask = useCallback(
    (newTask: Task) => {
      setTasks([...tasks, newTask]);
    },
    [tasks]
  );

  const handleTasksChange = useCallback(
    (newTask: Task) => {
      let updatedTasks = tasks.filter((task) => task.id !== newTask.id);
      updatedTasks.push(newTask);

      setTasks(updatedTasks);
    },
    [tasks]
  );

  const toDoTasks = useMemo(
    () => filterTasksBySection(tasks, SectionsEnum.Todo),
    [tasks]
  );
  const inProgressTasks = useMemo(
    () => filterTasksBySection(tasks, SectionsEnum.InProgress),
    [tasks]
  );
  const doneTasks = useMemo(
    () => filterTasksBySection(tasks, SectionsEnum.Done),
    [tasks]
  );

  return (
    <Container>
      <Columns>
        <ColumnCard
          title="To Do"
          tasks={toDoTasks}
          updateTask={handleTasksChange}
        />
        <ColumnCard
          title="In Progress"
          tasks={inProgressTasks}
          updateTask={handleTasksChange}
        />
        <ColumnCard
          title="Done"
          tasks={doneTasks}
          updateTask={handleTasksChange}
        />
      </Columns>
      <AddTask onSubmit={handleNewTask} nextTaskId={tasks.length} />
    </Container>
  );
}
