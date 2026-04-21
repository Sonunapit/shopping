import axios from "../../api/axioconfig";
import { loaduser, removeuser } from "../../reducers/userSlice";

export const asynclogoutuser = () => async (dispatch, getState) => {
  try {
    localStorage.removeItem("/api/auth/logout");
    dispatch(removeuser());
    
  } catch (error) {
    console.log(error);
  }
};

export const asynccurrentuser = () => async (dispatch, getState) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) dispatch(loaduser(user));
  
  } catch (error) {
    console.log(error);
  }
};

export const asyncLoginUser = (user) => async (dispatch) => {
  try {
    const res = await axios.get("/api/auth/login");

    const foundUser = res.data.find(
      (u) =>
        u.email === user.email.trim() && u.password === user.password.trim(),
    );

    if (foundUser) {
      dispatch(loaduser(foundUser)); 
      localStorage.setItem("user", JSON.stringify(foundUser)); 
      
    } else {
      alert("Invalid email or password");
    }
  } catch (error) {
    console.log(error);
  }
};

export const asyncregisteruser = (user) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/api/auth/register", user);
    
  } catch (error) {
    console.log(error);
  }
};

export const asyncupdateuser = (id,user) => async (dispatch, getState) => {
  try {
    const {data} = await axios.patch("/users/" +id  , user);
    localStorage.setItem("user", JSON.stringify(data))

    dispatch(asynccurrentuser(user))
    
  } catch (error) {
    console.log(error);
  }
};

export const asyncdeleteuser = (id) => async (dispatch, getState) => {
  try {
    await axios.delete("/users/" +id)
    dispatch(asynclogoutuser())
    c
  } catch (error) {
    console.log(error)
  }
} 
