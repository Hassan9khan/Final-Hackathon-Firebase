import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useRef } from 'react'
import { auth } from "../config/config";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const email = useRef();
  const password = useRef();
  const navigate = useNavigate()

  const getValue = (event) => {
    event.preventDefault();
    console.log(email.current.value);
    console.log(password.current.value);

    const auth = getAuth();
createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    navigate('/login')
    
  })
  .catch((error) => {
    console.log(error);
  });
  };


  return (
    <div>
      <h1 className="text-center text-2xl">Register</h1>
      <div>
        <form onSubmit={getValue}>
          <input
            type="email"
            placeholder="enter your email"
            className="input input-bordered input-info w-full max-w-xs"
            ref={email}
          />
          <input
            type="password"
            placeholder="enter your password"
            className="input input-bordered input-info w-full max-w-xs"
            ref={password}
          />
          <button className='btn btn-primary' type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;