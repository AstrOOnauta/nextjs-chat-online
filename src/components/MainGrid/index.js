import styled from "styled-components"

const MainGrid = styled.main`
  display: grid;
  @media(min-width: 860px){
    grid-template-columns: 70% 29%;
  }
  background: rgba( 0, 0, 0, 0.9 );
  color: rgba( 255, 255, 255, 0.8 );
  width: 100%;
  min-height: 100vh;
`
export default MainGrid