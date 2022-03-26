import {
  Text,
  Center,
  VStack,
  Box,
  Flex,
  Button,
  Input,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Select,
  option,
} from "@chakra-ui/react";
import React from "react";
import { GoPencil } from "react-icons/go";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateGoal } from "../features/tasks/taskSlice";

function TaskdrawerEdit({ goal }) {
  //   console.log(goal);
  // desc: "asdada"
  // ​
  // status: "todo"
  // ​
  // text:
  const [text, setText] = useState(goal.text);
  const [status, setStatus] = useState(goal.status);
  const [desctext, setDesctext] = useState(goal.desc);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(status);
    // console.log(text);
    let selectgrp = document.getElementById("lang");
    let statuss = selectgrp.options[selectgrp.selectedIndex].value;
    const goalData = {
      text: text,
      status: statuss,
      desc: desctext,
    };
    const id = goal._id;
    console.log(goalData);
    // console.log(id);
    dispatch(updateGoal({ id, goalData }));
    setText("");
    setStatus(statuss);
    setDesctext(desctext);
  };

  return (
    <>
      <Button ref={btnRef} bgColor="lightgreen" onClick={onOpen}>
        <GoPencil />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bgColor="ivory">
          <DrawerCloseButton />
          <DrawerHeader fontSize="2xl">Edit Task 📝</DrawerHeader>

          <DrawerBody>
            <form onSubmit={onSubmit}>
              <Box>
                <Text pb="2" fontSize="lg" htmlFor="text">
                  Goal
                </Text>
                <Input
                  //   width={{ md: "md" }}
                  variant="filled"
                  mb="10"
                  placeholder="Task title..."
                  bgColor="lightgreen"
                  _placeholder={{ color: "black" }}
                  type="text"
                  name="text"
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <Text pb="2" fontSize="lg" htmlFor="text">
                  Description
                </Text>
                <Input
                  variant="filled"
                  mb="10"
                  placeholder="Task description..."
                  bgColor="lightgreen"
                  _placeholder={{ color: "black" }}
                  type="desctext"
                  name="desctext"
                  id="desctext"
                  value={desctext}
                  onChange={(e) => setDesctext(e.target.value)}
                />
                <Text fontSize="lg" pb="2" htmlFor="lang">
                  Status
                </Text>
                <Select
                  mb="50"
                  variant="filled"
                  bgColor="lightgreen"
                  name="languages"
                  id="lang"
                  placeholder="Select state"
                >
                  <option value="todo">todo 🔴</option>
                  <option value="inprogress">inprogress 🟡</option>
                  <option value="done">done 🟢</option>
                </Select>
                {/* <select name="languages" id="lang">
                    <option value="todo">todo</option>
                    <option value="inprogress">inprogress</option>
                    <option value="done">done</option>
                  </select> */}
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="10"
              >
                <Button bgColor="lightgreen" type="submit">
                  Edit Task
                </Button>
              </Box>
            </form>
          </DrawerBody>

          <DrawerFooter>
            {/* {/* <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default TaskdrawerEdit;
