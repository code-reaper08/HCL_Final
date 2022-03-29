import React from "react";
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import {
  Text,
  Center,
  VStack,
  Box,
  Flex,
  Button,
  Input,
  Spinner,
} from "@chakra-ui/react";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/taskpad");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return (
      <>
        <Box
          height={{ md: "100vh" }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="lightgreen"
            size="xl"
          />
          <Text fontSize="2xl" color="ivory">
            Please wait while we log you in
          </Text>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box bgColor="black" height={{ md: "100vh" }}>
        <Center color="white" p="10">
          <Text fontSize="5xl">Login</Text>
        </Center>
        <section>
          <form onSubmit={onSubmit}>
            <Box
              flexDirection="column"
              alignItems="center"
              display="flex"
              //   color="white"
              //   paddingTop="30"
              //   marginLeft="400"
              //   marginRight="400"
              //   bgColor="black"
            >
              <Box mb="5">
                <Text fontSize="lg" color="lightgreen">
                  Email
                </Text>
                <Input
                  width={{ md: "md" }}
                  variant="filled"
                  bgColor="lightgray"
                  _placeholder={{ color: "black" }}
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={onChange}
                />
              </Box>
              <Box mb="5">
                <Text fontSize="lg" color="lightgreen">
                  Password
                </Text>
                <Input
                  width={{ md: "md" }}
                  variant="filled"
                  bgColor="lightgray"
                  _placeholder={{ color: "black" }}
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  placeholder="Create a new password"
                  onChange={onChange}
                />
              </Box>
              <Box mb="10">
                <Button bgColor="lightgreen" color="black" type="submit">
                  Submit
                </Button>
              </Box>
            </Box>
          </form>
        </section>
      </Box>
    </>
  );
}

export default Login;
