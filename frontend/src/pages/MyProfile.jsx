// src/pages/Profile.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MyProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/user/${userId}`)
    // userid skal være stien 
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(console.error);
  }, [userId]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <p>Email: {user.email}</p>
      {/* Tilføj flere felter efter behov */}
    </div>
  );
};

export default MyProfile;

  