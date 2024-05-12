// Profile.js

import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const currentUser = useSelector(state => state.user.user);
  const ticketInfo = useSelector(state => state.trainBooking.ticketInfoByUser[currentUser]);
    console.log(ticketInfo);
  return (
    <div>
      <h2>Profile</h2>
      <h3>User:</h3>
      <h3>Booked Tickets:</h3>
      {ticketInfo && ticketInfo.length > 0 ? (
        <ul>
          {ticketInfo.map((ticket, index) => (
            <li key={index}>
              
            </li>
          ))}
        </ul>
      ) : (
        <p>No tickets booked yet.</p>
      )}
    </div>
  );
};

export default Profile;
