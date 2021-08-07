import React, { useState } from "react"
import { useRouter } from "next/router"
import nookies from "nookies"
import LoginScreen from "../src/components/LoginScreen"
import LoginArea from "../src/components/LoginArea"
import LogoArea from "../src/components/LogoArea"
import FormLoginArea from "../src/components/FormLoginArea"
import GithubLogo from "../src/components/GithubLogo"
import AstrOOnauta from "../src/components/AstrOOnauta"

export default function LoginPage(){
    const router = useRouter()
    const [githubUser, setGithubUser] = useState("")
    
    return(
        <LoginScreen>
            <LoginArea>
                <LogoArea>
                    <GithubLogo src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png" />
                    <p><strong>Conecte-se</strong> ao chat do GitHub!</p>
                    <p><strong>Conheça</strong> novas pessoas através da comunidade do GitHub!</p>
                    <p><strong>Compartilhe</strong> conhecimento!</p>
                </LogoArea>
                <FormLoginArea>
                    <form onSubmit={(event)=>{
                        event.preventDefault()
                        fetch("https://alurakut.vercel.app/api/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ githubUser: githubUser })
                        })
                        .then(async (res)=>{
                            const req = await res.json()
                            const token = req.token
                            nookies.set(null, "USER_TOKEN", token, {
                                path: "/",
                                maxAge: 86400 * 7
                            })
                            router.push("/")
                        })
                        setGithubUser("")

                    }} >
                        <p>Acesse agora mesmo com seu usuário do <strong>GitHub!</strong></p>
                        <input  required
                                className="inputLoginArea"
                                placeholder="Usuário"
                                value={githubUser}
                                onChange={(e)=>{
                                    setGithubUser(e.target.value)
                                }} />
                        <button className="buttonLoginArea"
                                type="submit">Entrar</button>
                    </form>
                </FormLoginArea>
                <AstrOOnauta />
            </LoginArea>
        </LoginScreen>
    )
}