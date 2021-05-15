import React from 'react';
import styled from 'styled-components'

const Header = () => {
    return (
        <Title>ONLY.</Title>
    )
}

const Title = styled.div`
display: 
    font-family: Helvetica Neue;
    font-size: 64px;
    font-style: normal;
    font-weight: 700;
    line-height: 78px;
    letter-spacing: 0em;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 40px;
    text-align: center;
`

export default Header;