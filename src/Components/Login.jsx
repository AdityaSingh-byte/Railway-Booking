import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authSlice, { authActions } from '../Redux/store/auth-slice';
import { userActions } from '../Redux/store/user-slice';
import { useNavigate, Link } from 'react-router-dom';
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
  InputRightElement,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import trainBackGround from '../assets/steam-train-chugs-through-mountain-forest-scene-generative-ai.jpg'
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const handleShowClick = () => setShowPassword(!showPassword);
  const handleLogin = async () => {
    try {
      const response = await fetch('https://railway-booking-3z2u.onrender.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const usersJsonPromise = response.json();
      const users = await usersJsonPromise;

      const foundUser = users.find(user => user.username === username && user.password === password);
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
    <div style={{ backgroundImage: `url('${trainBackGround}')`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '90vh' }} >

      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"

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
                      value={username} onChange={e => setUsername(e.target.value)} />
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
                {error && (
                  <Alert status="error" borderRadius={4}>
                    <AlertIcon />
                    {error}
                  </Alert>
                )}
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
