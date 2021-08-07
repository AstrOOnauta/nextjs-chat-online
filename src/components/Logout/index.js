import styled from "styled-components";

const StyledLogout = styled.a`
    display: block;
    width: 90%;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    margin: 3.5rem auto 0 auto;
    color: black;
    text-decoration: inherit;
    border-radius: 5rem;
    background-color: white;
`

export default function Logout(props){
    return(
        <StyledLogout href={props.href}>
            Sair
        </StyledLogout>
    )
}