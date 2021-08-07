import styled from "styled-components";

const StyledChatBox = styled.div`
    overflow-y: scroll;
    max-width: 96%;
    height: 78vh;
    margin: 1rem;
`
const StyledTagDiv = styled.div`
  padding: .3rem;
  word-break: break-word;
`

const StyledTagA = styled.a`
  color: inherit;
  text-decoration: inherit;
`


export default function ChatBox(props){
    return(
    <StyledChatBox>
        {props.chatComplete.slice(0,15).reverse().map((chat, index)=>{  //Map the HOOK STATE which contain all messages
              return(                                                   //and show this messages in order
                <StyledTagDiv key={index} >
                  <StyledTagA href={`http://github.com/${chat.user}`}
                      target="_blank" rel="noreferrer">{chat.user}: </StyledTagA>
                  {chat.message}
                </StyledTagDiv>
              )
            })}
    </StyledChatBox>
    )
}