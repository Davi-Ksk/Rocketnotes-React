import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { api } from "../../services/api";


import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';
import { NoteItem } from '../../components/NoteItem';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';

import { Container, Form } from "./style";



export function New() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [links, setLinks ] = useState([]); //guarda todos os links
    const [newLink, setNewLink] = useState(""); //link adicionado no momento

    const [tags, setTags ] = useState([]); 
    const [newTag, setNewTag] = useState(""); 

    const navigate = useNavigate();


    // handles
    //--------------------------------------------------------------------

    function handleAddLink() {
        if(!newLink) {
            alert("Ops! Digite algo no seu link!");
        } else {
            setLinks(prevState => [...prevState, newLink]); //checa o que tinha antes, monta tudo que tinha antes com o novo link
            setNewLink("");
        }
    }

    function handleRemoveLink(deleted) {
        setLinks(prevState => prevState.filter(link => link !== deleted));
    }

    function handleAddTag() {
        if(!newTag) {
            alert("Ops! Digite algo na sua tag!");
        } else {
            setTags(prevState => [...prevState, newTag]); //checa o que tinha antes, monta tudo que tinha antes com o novo link
            setNewTag("");
        }
    }

    function handleRemoveTag(deleted) {
        setTags(prevState => prevState.filter(tag => tag !== deleted));
    }

    async function handleNewNote() {

        if(!title) {
            return alert("Digite um título para a nota!")
        }
        
        if(newLink) {
            return alert(`
            Você não adicionou um link que já escreveu! 
            Clique para adicionar ou deixe o campo vazio.
            `)
        }

        if(newTag) {
            return alert(`
            Você não adicionou uma tag que já escreveu! 
            Clique para adicionar ou deixe o campo vazio.
            `)
        }


        await api.post("/notes", {
            title,
            description,
            links,
            tags
        });

        alert("Nota criada com sucesso!");
        navigate("/");
    }

    return(
        <Container>
            <Header/>

            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <Link to="/" >Voltar</Link>   
                    </header>

                    <Input 
                        placeholder="Titulo"
                        onChange={(e) => setTitle(e.target.value)}

                    />
                    
                    <TextArea 
                        placeholder="Observações"
                        onChange={(e) => setDescription(e.target.value)}    
                    />

                    <Section title="Links úteis">
                        {
                            links.map((link, index) => (
                                <NoteItem 
                                key={String(index)}//sempre colocado em componentes listados
                                value={link}
                                onClick={() => handleRemoveLink(link)} //quando houver um parametro para função, usa-se arrow function
                            />
                            ))                  
                        }
                        <NoteItem 
                            isNew 
                            placeholder="Novo link"
                            value={newLink}
                            onChange={(e) => setNewLink(e.target.value)}
                            onClick={handleAddLink}
                        />
                    </Section>

                    <Section title="Marcadores">                        
                        <div className="tags">
                            {
                                tags.map((tag, index) => (
                                    <NoteItem
                                    key={String(index)} 
                                    value={tag} 
                                    onClick={() => handleRemoveTag(tag)}
                                />
                                ))
                            }
                            {/* <NoteItem value="react" /> */}
                            <NoteItem 
                                isNew
                                placeholder="Nova Tag"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onClick={handleAddTag}
                            />
                        </div>
                    </Section>

                    <Button 
                        title="Salvar" 
                        onClick={handleNewNote}
                    />
                </Form>

            </main>
        </Container>
    )
}