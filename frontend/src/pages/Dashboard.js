import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { GoThreeBars } from "react-icons/go";
// import GoalItem from "../components/GoalItem";
import {
  Text,
  Box,
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import { getGoals } from "../features/tasks/taskSlice";
import Taskdrawer from "../components/Taskdrawer";
import TaskItem from "../components/TaskItem";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

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
            Please wait while we fetch your Tasks
          </Text>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box px="10" bgColor="black" height="100vh">
        {/* <h1>Welcome {user && user.name}</h1> */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {/* brand */}
          <Box>
            <Box color="white" display="flex" alignItems="center">
              <Text fontSize={{ base: "5xl", md: "7xl" }}>Tasket</Text>
              <Text px="1" color="lightgreen">
                v1.0.0
              </Text>
            </Box>
          </Box>
          {/* right menu */}
          <Box display="flex" flexDirection="row" alignItems="center">
            <Box
              display={{ base: "none", md: "flex" }}
              fontSize="xl"
              alignItems="center"
              px="10"
            >
              <Text color="white">Hello</Text>
              <Text color="lightgreen" px="1">
                {user && user.name}
              </Text>
              <Text>👋</Text>
            </Box>
            {/* menu */}
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<GoThreeBars />}
                variant="filled"
                bgColor="lightgreen"
              />
              <MenuList bgColor="lightgreen">
                <MenuItem display={{ md: "none" }} minH="48px">
                  <Avatar
                    boxSize="2rem"
                    borderRadius="full"
                    src="https://bit.ly/broken-link"
                    alt="Fluffybuns the destroyer"
                    mr="12px"
                  />
                  <span>Hello {user && user.name} 👋</span>
                </MenuItem>
                <MenuItem>
                  <Link to="/">Home</Link>
                </MenuItem>
                <MenuItem>
                  <button className="btn" onClick={onLogout}>
                    Logout
                  </button>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
        {/* Task add button */}
        <Box display="flex" flexDirection="column" alignItems="center" pt="5">
          <Taskdrawer />
        </Box>
        {/* tasks listing */}
        <Box
          pt="10"
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          // alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Text color="white" fontSize="3xl" mb="5">
              Todo
            </Text>
            {goals.length > 0 ? (
              <Box>
                {goals.map((goal) =>
                  goal.status == "todo" ? (
                    <TaskItem key={goal._id} goal={goal} />
                  ) : (
                    <></>
                  )
                )}
              </Box>
            ) : (
              <Text color="darkgray">You have not set any goals</Text>
            )}
          </Box>

          <Box>
            <Text color="white" fontSize="3xl" mb="5">
              In-progress
            </Text>
            {goals.length > 0 ? (
              <Box>
                {goals.map((goal) =>
                  goal.status == "inprogress" ? (
                    <TaskItem key={goal._id} goal={goal} />
                  ) : (
                    <></>
                  )
                )}
              </Box>
            ) : (
              <Text color="darkgray">You have not set any goals</Text>
            )}
          </Box>
          <Box>
            <Text color="white" fontSize="3xl" mb="5">
              Done
            </Text>
            {goals.length > 0 ? (
              <Box>
                {goals.map((goal) =>
                  goal.status == "done" ? (
                    <TaskItem key={goal._id} goal={goal} />
                  ) : (
                    <></>
                  )
                )}
              </Box>
            ) : (
              <Text color="darkgray">You have not set any goals</Text>
            )}
          </Box>
        </Box>
      </Box>

      {/* <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section> */}
    </>
  );
}

export default Dashboard;
