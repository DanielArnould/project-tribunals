import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { MouseEvent } from "react";
import { GoCheckCircle, GoCircle } from "react-icons/go";
import Task from "../lib/Task";

interface Props {
  task: Task;
  isAlternate: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const TaskItem = ({ task, isAlternate, onClick }: Props) => {
  // const entryTypeMappings = {
  //   label: "Label",
  //   text: "Text entry",
  //   number: "Numerical entry",
  //   multi: "Multi-type entry",
  //   default: "Custom entry",
  // };
  // const entryType =
  //   entryTypeMappings[task.entryType] || entryTypeMappings.default;

  return (
    <Flex
      height="70px"
      gap={2}
      alignItems="center"
      p={4}
      bg={isAlternate === true ? "stoneGray.50" : "white"}
    >
      <Checkbox colorScheme="salmon" />
      <Button
        variant="link"
        fontWeight={600}
        size="lg"
        colorScheme="black"
        onClick={onClick}
      >
        {task.name}
      </Button>
      {/* <Divider orientation="vertical" borderColor="black" />
      <Text fontSize="lg">
        {entryType} {`(${task.entryCount})`}
      </Text> */}
      <Spacer />
      {task.entries.length > 0 ? (
        <GoCheckCircle fontSize={32} />
      ) : (
        <GoCircle fontSize={32} />
      )}
    </Flex>
  );
};

export default TaskItem;
