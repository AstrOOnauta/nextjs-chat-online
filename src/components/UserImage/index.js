import styled from "styled-components";

const StyledUserImage = styled.img`
    -moz-force-broken-image-icon: 1;
    border-radius: 20rem;
    padding: 1rem;
    margin: auto;
    max-width: 80%;
    height: auto;
    display: block;
`

export default function UserImage(props){
    return(
        <StyledUserImage src={props.src} alt={props.alt} />
    )
}