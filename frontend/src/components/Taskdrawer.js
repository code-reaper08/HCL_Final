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
import { createGoal } from "../features/tasks/taskSlice";

function Taskdrawer() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const [desctext, setDesctext] = useState("");
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(status);
    // console.log(text);
    let selectgrp = document.getElementById("lang");
    let statuss = selectgrp.options[selectgrp.selectedIndex].value;
    dispatch(createGoal({ text: text, status: statuss, desc: desctext }));
    setText("");
    setStatus(statuss);
    setDesctext(desctext);
  };

  return (
    <>
      <Button ref={btnRef} bgColor="lightgreen" onClick={onOpen}>
        <GoPencil /> Add Task
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
          <DrawerHeader fontSize="2xl">Add Task 📝</DrawerHeader>

          <DrawerBody>
            <form onSubmit={onSubmit}>
              <Box>
                <Text pb="2" fontSize="lg" htmlFor="text">
                  Task title
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
                  Add Task
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
export default Taskdrawer;
