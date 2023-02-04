import { RiShutDownLine } from 'react-icons/ri';
import { Profiler } from "react";
import { Container, Profile, Logout} from "./styles";

export function Header(){
    return(
        <Container >
            <Profile>
                <img 
                    src="https://github.com/davi-ksk.png"
                    alt="Foto do usuário"
                />

                <div>
                    <span>Bem-vindo,</span>
                    <strong>Davi Kraieski</strong>
                </div>
            </Profile>

            <Logout>
                <RiShutDownLine />
            </Logout>

        </Container>
    )
}