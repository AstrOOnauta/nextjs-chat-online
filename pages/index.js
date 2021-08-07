import { useState, useEffect } from "react";
import nookies from "nookies"
import jwt from "jsonwebtoken"
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import ChatName from "../src/components/ChatName";
import ChatBox from "../src/components/ChatBox";
import UserImage from "../src/components/UserImage";
import UserName from "../src/components/UserName";
import UserDescription from "../src/components/UserDescription";
import Logout from "../src/components/Logout";


//Main function for NextJS
export default function Home(props) { //The props contain the github user logged received by getServerSideProps function

  //Required HOOKS STATES for this application
  const [githubUserAvatar, setGithubUserAvatar] = useState("")
  const [githubUserName, setGithubUserName] = useState("")
  const [githubUserLocation, setGithubUserLocation] = useState("")
  const [githubUserBio, setGithubUserBio] = useState("")
  const [githubUserCreated_at, setGithubUserCreated_at] = useState("")

  const [chatComplete, setChatComplete] = useState([])  //Render all messages in DB for this app
  const [chatMessage, setChatMessage] = useState("")    //Render the message submited in chat
  
  const githubUser = props.githubUser

  /*HOOK EFFECT for this application
    It connect with github API and datocms database API and
    get the data for storage in HOOKS STATE*/
  useEffect(function(){
      
    //Fetch for connect with github API and get the user data logged in this application
    fetch(`https://api.github.com/users/${githubUser}`, {
        method: "GET"
      })
      .then(function(res){
        return res.json()
      })
      .then(function(res){
        if(res.avatar_url === undefined){
          setGithubUserAvatar("https://github.com/github.png")
        }else{
          setGithubUserAvatar(res.avatar_url)
        }
        if(res.name === undefined){
          setGithubUserName("Usuário não cadastrado")
        }else{
          setGithubUserName(res.name)
        }
        if(res.location === undefined){
          setGithubUserLocation("Sem dados de localização...")
        }else{
          setGithubUserLocation(res.location)
        }
        if(res.bio === undefined){
          setGithubUserBio("Sem biografia...")
        }else{
          setGithubUserBio(res.bio)
        }
        if(res.created_at === undefined){
          setGithubUserCreated_at("...")
        }else{
          setGithubUserCreated_at(res.created_at.substring(0, 10))
        }
      })

    //setInterval for refresh the messages in dato DB and to transform this chat in a REAL TIME CHAT
    const interval = setInterval(()=>{
      //Fetch for to connect with datocms DB API and only to read the chat message in JSON format (GraphQL)
      fetch("https://graphql.datocms.com/", {
        method: "POST",
        headers: {
          "Authorization": "338c1d613e53d6aa089a62bc6106c3",
          "Content-Type" : "application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify({ "query": `query {
          allChats {
            id
            user
            message
          }
        }` })
      })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        const messagesDatoCMS = res.data.allChats
        setChatComplete(messagesDatoCMS)
      })
    }, 100)

    return () => clearInterval(interval)

  }, [])
  
  return (
    <MainGrid>
      <Box>

        <ChatName>
          CHAT ONLINE
        </ChatName>

        {/*Component which Map the HOOK STATE which contain all messages*/}
        <ChatBox chatComplete={chatComplete} /> 

        <form className="formChatArea" onSubmit={(event)=>{ //Form for send message for DB when submited
          event.preventDefault()

          const message = new FormData(event.target)  //Receives form params event

          //Creates a JSON with the form data received
          const chat = {
            user: props.githubUser,
            message: message.get("message")
          }

          //Fetch for send the JSON created in step before for the datocms DB via POST Method
          //to creates a new item
          fetch("/api/chat", {
            method: "POST",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify(chat) 
          })
          .then(async (res)=>{
            const data = await res.json()
            const chat = data.recorder  //receives all messages data from datocms DB

            setChatComplete([chat, ...chatComplete])  //Push the new message in HOOKS STATE with old messages
            setChatMessage("")  //Reset the form field
          })
        }}>

          <input  className="inputChatArea"
                  name="message"
                  placeholder="Escreva uma menssagem..."
                  autoComplete="off"
                  value={chatMessage}
                  onChange={(e)=>setChatMessage(e.target.value)}
          />

          <button className="buttonChatArea"
                  type="submit">Enviar</button>
                  
        </form>

      </Box>

      <Box>

        <UserImage src={githubUserAvatar} alt="BROKEN GITHUB IMAGE" />
        <UserName>{props.githubUser} - {githubUserName}</UserName>
        <UserDescription >{githubUserLocation}</UserDescription>
        <UserDescription>{githubUserBio}</UserDescription>
        <UserDescription>Membro desde <strong>{githubUserCreated_at}</strong></UserDescription>
        <Logout href="/login" />
        
      </Box>

    </MainGrid>
  );
}

//Function for fetch data at build time by cookies
export async function getServerSideProps(context){
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN

  //API created by ALURA© for auth github users
  const { isAuthenticated } = await fetch("https://alurakut.vercel.app/api/auth", {
    headers: {
      Authorization: token
    }
  })
  .then((response) => response.json())  //Enter in chat page

  //Condition to start in /login page when access this app
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  //return the github user used in login page for the main Home function
  const { githubUser } = jwt.decode(token)
  return{
    props: {
      githubUser
    }
  }
}