import styled from "styled-components";
import { useRouter } from 'next/router';
import nookies from "nookies"

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
    const router = useRouter()
    return(
        <StyledLogout   href={props.href}
                        onClick={()=>{  //Destroy Cookie USE_TOKEN when exit button is clicked
                            nookies.destroy(null, 'USER_TOKEN')
                            router.push('/login')}}>
            Sair
        </StyledLogout>
    )
}
