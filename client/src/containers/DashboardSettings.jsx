import React, { useState, useRef } from "react";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { FiEdit3 } from "react-icons/fi";
import profile from "../assets/profile.jpg";
import AdminNavbar from "../components/Admin/AdminNavbar";

export default function DashboardSettings() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(profile);

  const inputRef = useRef(null);

  const handleSaveChanges = () => {
    // Implement logic to save changes to the backend
    console.log("Changes saved!");
  };

  const handleAvatarClick = () => {
    // Trigger click on the input file element
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Assuming you're working with local files, you might want to upload the file to a server
      // and update the profileImage state with the new URL.
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <Container component="main" maxWidth="sm" className="p-20">

      <div className="relative flex justify-center " >
        <img
          alt="Profile"
          src={profileImage}
          className="w-32 h-32 mb-4 cursor-pointer object-cover rounded-full"
          onClick={handleAvatarClick}
        />
        <FiEdit3  onClick={handleAvatarClick} className="absolute bottom-8 right-52 p-2 bg-white rounded-full shadow-md cursor-pointer" size={30} />
      </div>
      <div className="flex flex-col items-center p-4" >

      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <Typography component="h1" variant="h5" className="font-bold">
        Account Settings
      </Typography>
      <form className="w-full max-w-md mt-6 flex-row item-center justify-center">
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="name"
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Current Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="newPassword"
          label="New Password"
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <hr className="my-4"></hr>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className="mt-16"
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </form>
      </div>
    </Container>
  );
}
