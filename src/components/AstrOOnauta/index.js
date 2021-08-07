import styled from "styled-components";

const StyledTagP = styled.p`
    position: absolute;
    text-align: center;
    left: 50%;
    transform: translate(-50%, -50%);
    bottom: 1rem;

`
const StyledTagA = styled.a`
    color: inherit;
    text-decoration: inherit;
`


export default function AstrOOnauta(){
    return(
        <StyledTagP>
            Desenvolvido por <StyledTagA
                                href="https://github.com/AstrOOnauta"
                                target="_blank"
                                rel="nonoreferrer">AstrOOnauta</StyledTagA>
        </StyledTagP>
    )
}