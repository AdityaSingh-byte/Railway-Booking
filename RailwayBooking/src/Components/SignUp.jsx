// SignUp.js
import React, { useState } from 'react';
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
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const handleSubmit =(e)=>{
    e.preventDefault();
  }
  const handleSignUp = async () => {
    try {
      if (username && password) {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
          throw new Error('Failed to create account');
        }
        const newUser = await response.json();
        
        setUsername('');
        setPassword('');
        setShowAlert(true);
      } else {
        setError('Username and password are required');
      }
    } catch (error) {
      console.log(error);
      setError('Error signing up');
    }
  };

  return (
    <div>
  
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
     <Heading color="blue.500">Create New Account</Heading>
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
           
           </FormControl>
           <Button
             borderRadius={0}
             type="submit"
             variant="solid"
             colorScheme="blue"
             width="full"
             onClick={handleSignUp}
           >
             Create Account
           </Button>
         </Stack>
       </form>
     </Box>
   </Stack>
  
 </Flex>
 {showAlert && alert("Account Created")
        
      }
 </div>
    </div>
  );
};

export default SignUp;
