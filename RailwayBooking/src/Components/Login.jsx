
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authSlice, { authActions } from '../Redux/store/auth-slice';
import { userActions } from '../Redux/store/user-slice';
import { useNavigate,Link } from 'react-router-dom';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
 
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const dispatch =useDispatch();
  const handleSubmit =(e)=>{
    e.preventDefault();
  }
  const handleShowClick = () => setShowPassword(!showPassword);
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      // const users = await response.json();
      const usersJsonPromise = response.json(); // Get the Promise returned by response.json()
const users = await usersJsonPromise; // Await the Promise to get the actual JSON data

      const foundUser = users.find(user => user.username === username && user.password === password);
      console.log(foundUser);
      if (foundUser) {
       
        localStorage.setItem('user', JSON.stringify(foundUser));
        setError('');
        dispatch(authActions.login());
        dispatch(userActions.login(foundUser));
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.log(error);
      setError('Error logging in');
    }
  };
 
  return (
    <div>
    
       <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="blue.500" />
        <Heading color="blue.500">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="text" placeholder="User Name" 
                  value={username} onChange={e => setUsername(e.target.value)}/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password} onChange={e => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="blue"
                width="full"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link to='/signup' color="teal.500" >
          Sign Up
        </Link>
      </Box>
    </Flex>
    </div>
  );
};

export default Login;
