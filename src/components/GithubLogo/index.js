import styled from "styled-components";

const StyledGithubLogo = styled.img`
    max-width: 12rem;
    margin: 0 auto 3rem;
    filter: brightness(0) invert(1);
`

export default function GithubLogo(props){
    return(
        <StyledGithubLogo src={props.src} />
    )
}