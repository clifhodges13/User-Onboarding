import React, { useState } from 'react'
import LoginForm from './Components/LoginForm'
import styled from 'styled-components'
import './App.css'

export default function App() {

  const [data, setData] = useState('')
  const StyledApp = styled.div `
    padding: 0;
    margin: 0;
    width: 1100px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('https://images.pexels.com/photos/325521/pexels-photo-325521.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
    background-size: cover;
    background-position: bottom;
  `

  return (
    <>
      <StyledApp>
        <LoginForm />
      </StyledApp>
    </>
  );
}
