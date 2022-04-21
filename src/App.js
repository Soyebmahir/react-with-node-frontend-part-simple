import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users,setUsers]=useState([])
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res=>res.json())
    .then(data=>setUsers(data))
  },[])
  const handleAddUser =(event)=>{
    event.preventDefault()
    const name =event.target.name.value;
    const email =event.target.email.value
    console.log(name,email);
    const user ={name,email}
    //post data to server/backend
   fetch('http://localhost:5000/user',{
     method:'POST',
     headers:{
       'content-type':'application/json'
     },
     body:JSON.stringify(user)
   })
   .then(res=>res.json())
   .then(data =>{
     console.log(data);
     const newUser =[...users,data]
     setUsers(newUser)
   })
  }
  return (
    <div className="App">
      <h1>Total data at API {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type='text' name="name" placeholder='Name'></input>
        <input type='text' name='email' placeholder='Email'></input>
        <input type='submit' value='Add User'></input>
      </form>
      {
        users.map(user=><li key={user.id}> id: {user.id} name: {user.name} Email: {user.email}</li>)
      }

    </div>
  );
}

export default App;
