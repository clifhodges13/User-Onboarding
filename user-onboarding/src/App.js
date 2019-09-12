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
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom right, lightgreen, turquoise);
  `

  return (
    <>
      <StyledApp>
        <LoginForm />
      </StyledApp>
    </>
  );
}
