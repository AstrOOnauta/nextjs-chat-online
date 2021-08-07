import styled from "styled-components";

const LoginArea = styled.div`
    position: absolute;
    background: rgba( 255, 255, 255, 0.15 );
    color: rgba( 255, 255, 255, 0.8 );
    max-width: 35rem;
    min-width: 20rem;
    min-height: 80vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 5rem;
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 2rem );
    -webkit-backdrop-filter: blur( 2rem );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.2 );
`

export default LoginArea