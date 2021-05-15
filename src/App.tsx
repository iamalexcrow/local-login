import React from "react";
import Login from './Components/Login';
import Page from './Components/Page';
import Header from './Components/Header';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import styled from 'styled-components'
const App = () => {

  return (
        <>
        <Header/>
        <BrowserRouter>
          <Switch>
            <Wrapper>
              <Route exact path='/'>
                <Page/>
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
            </Wrapper>
          </Switch>
        </BrowserRouter>
        </>
      
  )
}

const Wrapper = styled.div`
box-sizing: border-box;
width: 100vw;
height: 100vh;
margin: 0 auto;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

export default App;