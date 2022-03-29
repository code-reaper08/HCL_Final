import React from "react";
import { Text, Center, VStack, Box, Flex, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Brand from "../components/Brand";
import Footer from "../components/Footer";
function Home() {
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();
  //   const { user } = useSelector((state) => state.auth);

  //   const onLogout = () => {
  //     dispatch(logout());
  //     dispatch(reset());
  //     navigate("/");
  //   };
  return (
    <Box bgColor="black" height={{ md: "100vh" }}>
      <Brand />
      <Box
        mt="100"
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        // alignItems="center"
        padding="10"
        justifyContent="space-between"
      >
        <Box marginRight={{ base: 0, md: 50 }}>
          <Text fontSize="3xl" textAlign="center" color="lightgreen" mb="3">
            Not familiar with Tasket?
          </Text>
          <Text textAlign="center" color="ivory" fontSize="2xl">
            Tasket is a minimalistic and intutive task tracking application,
            which focuses on simplifying user experinece with seamless
            navigation and simple UI.
            <br />
            If you never used Tasket before, we urge you to try posting some of
            your tasks.
            <br />
            <Button color="black" bgColor="lightgreen" mt="5">
              <Link to="/register">Register</Link>
            </Button>
          </Text>
        </Box>
        <Box mt={{ base: 10, md: 0 }}>
          <Text textAlign="center" fontSize="3xl" color="lightgreen" mb="3">
            Already have an account?
          </Text>
          <Text textAlign="center" color="ivory" fontSize="2xl">
            We are super happy that you've created an account with us, feel free
            to post your tasks here and track them on a regular basis. Hope you
            enjoy this enriching productive experience!
            <br />
            {/* <Text fontSize="lg" color="whitesmoke" textAlign="right" mt="3">
              Regards, <br />
              Vishwa R
            </Text> */}
            <Button color="black" bgColor="lightgreen" mt="5">
              <Link to="/login">Login</Link>
            </Button>
          </Text>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default Home;
