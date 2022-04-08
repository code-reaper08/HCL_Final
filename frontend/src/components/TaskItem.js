import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/tasks/taskSlice";
import { Badge } from "@chakra-ui/react";
import { GoX, GoPencil } from "react-icons/go";
import { VscTrash } from "react-icons/vsc";
import { GoClock } from "react-icons/go";
import { Text, Box, Button, Tooltip } from "@chakra-ui/react";
import TaskdrawerEdit from "./TaskdrawerEdit";
function TaskItem({ goal }) {
  const dispatch = useDispatch();

  return (
    <Box minWidth={{ md: "sm" }} rounded="lg" p="5" mb="5" bgColor="lightgreen">
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            {/* <GoPencil /> */}
            <TaskdrawerEdit goal={goal} />
          </Box>
          <Box>
            <Button
              bgColor="transparent"
              onClick={() => dispatch(deleteGoal(goal._id))}
              className="close"
            >
              <VscTrash />
            </Button>
          </Box>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          {goal.text}
        </Text>
        <Text color="white">
          <Tooltip
            label={
              "posted at" + new Date(goal.createdAt).toLocaleString("en-US")
            }
            openDelay={500}
          >
            <Text bgColor="black" p="1" rounded="full">
              <GoClock color="white" />
            </Text>
          </Tooltip>
        </Text>
      </Box>
      <Text fontSize="lg">{goal.desc}</Text>
      {goal.status === "done" ? (
        <Badge variant="solid" colorScheme="green">
          <p>{goal.status}</p>
        </Badge>
      ) : goal.status === "inprogress" ? (
        <Badge variant="solid" colorScheme="yellow">
          <p>{goal.status}</p>
        </Badge>
      ) : (
        <Badge boxShadow="lg" variant="solid" colorScheme="red">
          <p>{goal.status}</p>
        </Badge>
      )}
    </Box>
  );
}

export default TaskItem;
