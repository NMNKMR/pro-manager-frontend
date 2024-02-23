import styles from "./css/Settings.module.scss";
import PasswordInput from "../components/form-inputs/PasswordInput";
import Button from "../components/form-inputs/Button";
import { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import {useAuth} from "../context/user.context.js";
import { updateAccountInfo } from "../apis/auth.js";
import {useOutletContext} from "react-router-dom";

function Settings() {
  const {notifySuccess} = useOutletContext();
  const {user: {name: username}, updateUser} = useAuth();
  const [updateInfo, setUpdateInfo] = useState({
    name: username,
    oldPassword: "",
    newPassword: ""
  })

  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  
  const handleInputChange = (e)=> {
    const {name, value} = e.target;

    setUpdateInfo((prev)=> ({...prev, [name]: value}))
  }

  const handleAccountUpdate = async(e)=> {
    e.preventDefault();
    setError("");
    setProcessing(true);
    let updateInfoError = "";
    const {name, oldPassword, newPassword} = updateInfo;

    //Error Handling
    if(!name.trim()) updateInfoError="name can't be empty"
    else if(oldPassword.trim() && !newPassword.trim()) updateInfoError="new password is missing"
    else if(!oldPassword.trim() && newPassword.trim()) updateInfoError="old password is missing"
    else if (oldPassword && newPassword) {
      if(oldPassword.length < 8 || newPassword.length < 8) updateInfoError="password can't be less than 8 characters"
    }

    if(updateInfoError) {
      setError(updateInfoError);
      setProcessing(false);
      return
    }

    const {data: message, error} = await updateAccountInfo({...updateInfo});
      if(error) {
        setError(error);
        setProcessing(false);
        return;
      }
        
    if(name!==username) updateUser({name})
    setUpdateInfo({name: name, oldPassword: "", newPassword: ""})
    setProcessing(false);
    notifySuccess(message);
  }
  
  return (
    <div className={styles.settings}>
      <h3>Settings</h3>
      <form onSubmit={handleAccountUpdate}>
        <div>
          <div className={styles.form_input}>
            <IoPersonOutline />
            <input
              type="text"
              name="name"
              value={updateInfo.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
          </div>
        </div>
        <div>
          <div className={styles.form_input}>
            <PasswordInput
              value={updateInfo.oldPassword}
              name="oldPassword"
              placeholder="Old Password"
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.form_input}>
            <PasswordInput
              value={updateInfo.newPassword}
              name="newPassword"
              placeholder="New Password"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <p>{error}</p>
        <div
          className={
            (username === updateInfo.name.trim()) &&
            !(updateInfo.oldPassword && updateInfo.newPassword)
              ? styles.disable
              : ""
          }
        >
          <Button type="submit" processing={processing}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Settings