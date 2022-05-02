import React, { useState, useEffect, useRef } from "react";
import "./EditProfile.css";
import Avatar from "@mui/material/Avatar";
import { db, storageRef, storage } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUserAddress } from "../../features/userSlice";
import { useHistory } from "react-router-dom";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [site, setSite] = useState("");
  const [email, setEmail] = useState("");
  const useraddress = useSelector(selectUserAddress);
  const history = useHistory();
  const inputRef = useRef();
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const handleFireBaseUpload = () => {
    console.log("start of upload");
    // async magic goes here...
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    const uploadTask = storage.ref(`/images/${useraddress}`).put(imageAsFile);

    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        // console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:

        storageRef
          .child(`/images/${useraddress}`)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            console.log(fireBaseUrl);
            db.collection("userProfile").doc(useraddress).set({
              MetamaskAddress: useraddress,
              Name: name,
              CustomUrl: url,
              Bio: bio,
              Email: email,
              TwitterUsername: twitter,
              PersonalSite: site,
              Image: fireBaseUrl,
            });
            alert("Your profile is updated");
            history.push("/");
          });
      }
    );
  };
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(image);
  };

  const handleName = (e) => {
    setName(e.target.value);
    console.log(name);
  };
  const handleUrl = (e) => {
    setUrl(e.target.value);
  };
  const handleBio = (e) => {
    setBio(e.target.value);
  };
  const handleTwitter = (e) => {
    setTwitter(e.target.value);
  };
  const handleSite = (e) => {
    setSite(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    // console.log(useraddress);
  }, []);

  const handleEdit = () => {
    // console.log("btn click");
    handleFireBaseUpload();
  };

  return (
    <div className="editProfile">
      <div className="editProfile__container1">
        <h1 className="editProfile__text">Edit Profile</h1>
        <div className="form">
          <div className="form__content">
            <h4 className="form__text">Display Name</h4>
            <input value={name} onChange={handleName} className="form__input" />
          </div>
          <div className="form__content">
            <h4 className="form__text">Custom Url</h4>
            <input value={url} onChange={handleUrl} className="form__input" />
          </div>
          <div className="form__content">
            <h4 className="form__text">Bio</h4>
            <input value={bio} onChange={handleBio} className="form__input" />
          </div>
          <div className="form__content">
            <h4 className="form__text">Twitter Username</h4>
            <input
              value={twitter}
              onChange={handleTwitter}
              className="form__input"
            />
          </div>
          <div className="form__content">
            <h4 className="form__text">Personal Site or Portfolio</h4>
            <input value={site} onChange={handleSite} className="form__input" />
          </div>
          <div className="form__content">
            <h4 className="form__text">Email</h4>
            <input
              value={email}
              onChange={handleEmail}
              className="form__input"
            />
          </div>
          <div className="form__verification">
            {!useraddress ? (
              <button
                onClick={() => alert("Sign In with MetaMask")}
                className="editProfile__button"
              >
                Save Profile
              </button>
            ) : (
              <button onClick={handleEdit} className="editProfile__button">
                Save Profile
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="editProfile__container2">
        <Avatar
          alt=""
          src={imageAsFile ? URL.createObjectURL(imageAsFile) : null}
          sx={{ width: 250, height: 250 }}
        />
        <input
          className="img__input"
          onChange={handleImageAsFile}
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
        />
        <button
          onClick={() => {
            inputRef.current.click();
          }}
          className="profile__button"
        >
          Change profile picture
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
