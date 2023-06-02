import { useState } from "react";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { api } from "../../services/api";
import avatarPlaceholder from "../../assets/avatar_placeholder.svg";

import { Container, Form, Avatar } from "./style";



export function Profile() {

    const { user, updateProfile } = useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState("");
    const [passwordNew, setPasswordNew] = useState("");

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);

    async function handleUpdateProfile(e) {
        const user = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld
        }

        await updateProfile({ user, avatarFile });
    }

    function handleAvatarChange(event){
        const file = event.target.files[0];
        setAvatarFile(file); //guarda o arquivo selecionado

        const imagePreview = URL.createObjectURL(file); //transforma o arquivo em uma url
        setAvatar(imagePreview);
    }

    return(
        <Container>
            <header>
                <Link to="/">
                    <FiArrowLeft />
                </Link>
            </header>

            <Avatar>
                <img 
                    src={avatar}
                    alt="Foto do usuário"
                />

                <label htmlFor="avatar">
                    <FiCamera/>

                    <input
                        id="avatar"
                        type="file"
                        onChange={handleAvatarChange}
                    />
                </label>
            </Avatar>

            <Form>

            <Input 
                placeholder="Nome"
                type="text"
                icon={FiUser}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <Input 
                placeholder="E-mail"
                type="text"
                icon={FiMail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <Input 
                placeholder="Senha atual"
                type="password"
                icon={FiLock}
                onChange={(e) => setPasswordOld(e.target.value)}
            />

            <Input 
                placeholder="Nova senha"
                type="password"
                icon={FiLock}
                onChange={(e) => setPasswordNew(e.target.value)}
            />

            <Button title="Salvar" onClick={handleUpdateProfile} />

            </Form>
        </Container>
    )
}