import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  const nameRef = useRef()
  const emailRef = useRef()

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])



  const AddEventHadler = e => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name: name, email: email }

    // data send to the server
    fetch('http://localhost:5000/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const addUser = data;
        const newUsers = [...users, addUser];
        setUsers(newUsers)
      })

    nameRef.current.value = '';
    emailRef.current.value = '';
    e.preventDefault();
  }

  return (
    <div className="App">
      <h1>Length of users {users.length}</h1>

      <form onSubmit={AddEventHadler}>
        <input type="text" ref={nameRef} placeholder='name' />
        <input type="email" name="email" ref={emailRef} id="" placeholder='Email' />
        <input type="submit" value="submit" />
      </form>


      <ul>
        {
          users.map(user => <li key={user.id}>{user.id} {user.name} {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
