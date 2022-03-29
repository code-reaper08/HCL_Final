import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
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
import { register, reset } from "../features/auth/authSlice";
// import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

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

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
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
            Please wait while we set up your account
          </Text>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box bgColor="black" height={{ md: "100vh" }}>
        <Center color="white" p="10">
          <Text fontSize="5xl">Create Account</Text>
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
                  Name
                </Text>
                <Input
                  width={{ md: "md" }}
                  variant="filled"
                  bgColor="lightgray"
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  placeholder="Enter your name"
                  _placeholder={{ color: "black" }}
                  onChange={onChange}
                />
              </Box>
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
              <Box mb="5">
                <Text fontSize="lg" color="lightgreen">
                  Confirm password
                </Text>
                <Input
                  width={{ md: "md" }}
                  variant="filled"
                  bgColor="lightgray"
                  _placeholder={{ color: "black" }}
                  type="password"
                  name="password2"
                  id="password2"
                  value={password2}
                  placeholder="Confirm password"
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

export default Register;
