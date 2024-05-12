import React from 'react';
import { useSelector } from 'react-redux';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Container,
  Heading,
  Text,
} from '@chakra-ui/react';
import trainBackGround from '../assets/steam-train-chugs-through-mountain-forest-scene-generative-ai.jpg';

const Profile = () => {
  const currentUser = useSelector(state => state.user.user);
  const ticketInfo = useSelector(state => state.trainBooking.ticketInfoByUser[currentUser]);

  return (
    <div style={{ backgroundImage: `url("${trainBackGround}")`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxW="container.lg">
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 7px 29px 0px' }}>
          <Heading as="h2" mb={4} textAlign="center">Profile = {currentUser?.username}</Heading>
          <Heading as="h5" mt={4} textAlign="center">Booked Tickets:</Heading>
          {ticketInfo ? (
            <Table variant="striped" mt={4}>
              <Thead>
                <Tr>
                  <Th>Ticket</Th>
                  <Th>Class</Th>
                  <Th>Total Amount</Th>
                  <Th>Train Name</Th>
                  <Th>Source</Th>
                  <Th>Destination</Th>
                  <Th>Passengers</Th>
                  <Th>Seats No</Th> {/* New column for Seats No */}
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>{ticketInfo.class}</Td>
                  <Td>{ticketInfo.totalAmount}</Td>
                  <Td>{ticketInfo.train?.TrainName}</Td>
                  <Td>{ticketInfo.train?.source}</Td>
                  <Td>{ticketInfo.train?.destination}</Td>
                  <Td>
                    <ul>
                      {ticketInfo.passengers.map((passenger, passengerIndex) => (
                        <li key={passengerIndex}>
                          <li>Name: {passenger.name}</li>
                          <li>Age: {passenger.age}</li>
                          <li>Date: {passenger.date}</li>
                        </li>
                      ))}
                    </ul>
                  </Td>
                  <Td>{Math.floor(Math.random() * 100) + 1}</Td> 
                </Tr>
              </Tbody>
            </Table>
          ) : (
            <Text mt={4} textAlign="center">No tickets booked yet.</Text>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Profile;
