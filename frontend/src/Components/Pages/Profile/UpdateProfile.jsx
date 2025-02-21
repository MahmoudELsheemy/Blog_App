import React from "react";
import "./UpdateProfile.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../redux/apiCalls/ProfileApiCall";

const UpdateProfile = ({ setShowUpdateForm, profile }) => {
  const [name, setUsername] = useState(profile.name);
  const [bio, setDescription] = useState(profile.bio);
  const [passwoerd, setPassword] = useState("");

  const dispatch = useDispatch();
  //function to refresh the page && save the changes in the local storage
  const refreshPage = () => {
    // window.location.reload(false);
    //mod the user in the local storage
    const user = JSON.parse(localStorage.getItem("user"));
    user.name = name;
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      bio,
    };
    if (passwoerd.trim() !== "") {
      user.password = passwoerd;
    }

    dispatch(updateProfile(profile._id, user));

    setShowUpdateForm(false);
  };

  return (
    <div className="updateprofile">
      <form onSubmit={handleSubmit} className="update-form">
        <abbr title="Close">
          <i
            onClick={() => setShowUpdateForm(false)}
            className="bi bi-x-circle-fill update-close"
          ></i>
        </abbr>
        <h4 className="update-form-title">Update Your Profile</h4>
        <div className="update-form-input">
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="update-form-input">
          <input
            type="text"
            value={bio}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="update-form-input">
          <input
            type="password"
            value={passwoerd}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="update-form-button">
          <button onClick={refreshPage} type="submit">Update Profile</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
