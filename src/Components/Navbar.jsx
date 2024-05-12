import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Flex, Heading, Button, Image, Link as ChakraLink } from '@chakra-ui/react';
import { FaRegUserCircle } from 'react-icons/fa';
import { authActions } from '../Redux/store/auth-slice';
import trainImage from '../assets/Circle-icons-train.png';

const Navbar = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <Container maxW="container.lg">
      <Flex justifyContent="space-between" alignItems="center" py={3} borderBottom="1px solid" borderColor="gray.200">
        <div >
          <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
            <Image src={trainImage} alt="" boxSize="70px" />
          </a>
        </div>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li><Link to='/trainTicket' className="nav-link px-2 link-secondary">Train Tickets</Link></li>
          <li><a href="#" className="nav-link px-2">Bus Booking</a></li>
          <li><a href="#" className="nav-link px-2">Food On Train</a></li>
          <li><Link to="/trainSearch" className="nav-link px-2">Train Information</Link></li>
          <li><Link to="/live" className="nav-link px-2">Live Location</Link></li>
        </ul>
        <Flex alignItems="center">
          {isLoggedIn ? (
            <Flex alignItems="center" gap={"10px"}>
              <h5 style={{margin:"10px"}}>{user.username}</h5>
              <Link to="/profile" as={ChakraLink}>
                <FaRegUserCircle size={"30"} />
              </Link>
              <Button variant="outline" colorScheme="blue" ml={2} onClick={handleLogout}>Logout</Button>
            </Flex>
          ) : (
            <>
              <Link to="/login" as={ChakraLink}>
                <Button variant="outline" colorScheme="blue" mr={2}>Login</Button>
              </Link>
              <Link to="/signup" as={ChakraLink}>
                <Button colorScheme="blue">Sign-up</Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
