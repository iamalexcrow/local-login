import React from 'react';
import styled from 'styled-components'
import {Redirect} from 'react-router-dom';

import {useGlobalContext} from './context';

const Page:React.FC = () => {
    const {isAuth, Data, setIsAuth, setData} = useGlobalContext();
    if (!isAuth) return <Redirect to={"/login"}/>

    const logOut = () => {
        setIsAuth(false);
        setData({})
    }
    return (
        <>
            <Title>
                Здравствуйте, <span>{Data.firstName}</span>
            </Title>
            <Button onClick={()=>logOut()}>Выйти</Button>
        </>
    )
}

const Title = styled.h1`
    font-family: Helvetica Neue;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: 48px;
    letter-spacing: 0em;
    text-align: left;
& span {
    font-family: Helvetica Neue;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 49px;
    letter-spacing: 0em;
    text-align: left;
}
`
const Button = styled.button`
    width: 200px;
    height: 60px;
    left: 860px;
    top: 559px;
    background:rgba(245, 245, 245, 1);
    border-radius: 8px;
    font-family: Helvetica Neue;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: center;
    border: none;
`
export default Page;