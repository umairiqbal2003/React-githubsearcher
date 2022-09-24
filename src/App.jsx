import Img1 from "./images/umair.jpg"
import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import Img2 from "./images/error.PNG"

function App() {

  const[inputValue,setinputValue] = useState("")
  const[userInfo,setuserInfo] = useState("")
  const[error,setError] = useState(false)
  const[apiCall , setapiCall] = useState(false)

  useEffect(()=>{
    axios.get(`https://api.github.com/users/${inputValue ? inputValue : "umairiqbal2003"}`)
  .then((res)=>{
   setuserInfo(res.data)
   setError(false)
  })
  .catch((err)=>{
   console.log(err)
   setError(true)
  });
  }, [apiCall])

  const submitForm = (e)=>{
  e.preventDefault();
  console.log("inputValue" , inputValue)

  if(!inputValue){
    alert("Input Field must be filled")
    return;
  }
  setapiCall(!apiCall)
};
  return (
    <>
      <section className="mainbox">
        <section className="box1">
          <form onSubmit={submitForm}>
            <input value={inputValue} onChange={(e)=>{setinputValue(e.target.value)}}  type="text" name="" placeholder="Enter Your Github Profile" />
          </form>
        </section>
        {error === false ? <section className="box2">
          <div className="img">
            <img src={userInfo ? userInfo.avatar_url :Img1} alt="" />
          </div>
          <div className="list">
            <ul>
              <li>Name: <span className="liColor">{userInfo ? userInfo.name : "...username"}</span>  </li>
              <li>Bio : <span className="liColor">{userInfo ? userInfo.bio : "...bio"}</span></li>
              <li>Followers: <span className="liColor">{userInfo ? userInfo.followers : "...followers"}</span></li>
              <li>Following : <span className="liColor">{userInfo ? userInfo.following : "...following"}</span></li>
              <li>Public Repos:  <span className="liColor">{userInfo ? userInfo.public_repos : "...repos"}</span></li>
            </ul>
          </div>
        </section>: <img className="errorImage" src={Img2}  />  }
      </section>
   </>
  );
}

export default App;
