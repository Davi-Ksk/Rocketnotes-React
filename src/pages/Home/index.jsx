import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../../services/api';

import { FiPlus, FiSearch } from 'react-icons/fi'
import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Header } from '../../components/Header'
import { ButtonText } from '../../components/ButtonText'
import { Note } from '../../components/Note'
import { Input } from '../../components/Input'
import { Section } from '../../components/Section'

export function Home() {

    const [search, setSearch] = useState('');

    const [notes, setNotes] = useState([]);
    const [tags, setTags] = useState([]);
    const [tagsSelected, setTagsSelected] = useState([]);
    const navigate = useNavigate();


    function handleTagSelection(tagName) {
        const alreadySelected = tagsSelected.includes(tagName);

        if (alreadySelected) {
            const filteredTags = tagsSelected.filter(tag => tag !== tagName);
            setTagsSelected(filteredTags);
        } else {
            setTagsSelected(prevState => [...prevState, tagName]);
            // setTagsSelected([tagName]); Selecionar uma por vez
        }
    }

    function handleTagSelectionAll() {
        setTagsSelected([]);
    }

    function handleDetails(id) {
        navigate(`/details/${id}`);
    }

    useEffect(() => {
        async function fetchTags() {
            const response = await api.get('/tags');
            setTags(response.data);
        }

        fetchTags();
    },[]);

    useEffect(() => {
        
        async function fetchNotes() {
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
            setNotes(response.data);
        }

        fetchNotes();

    },[tagsSelected, search]); //quando mudar o conteúdo o useEffect vai ser executado

    return (
        <Container>
            <Brand>
                <h1>Rocketnotes</h1>
            </Brand>

            <Header />

            <Menu>
                <li>
                    <ButtonText 
                        title="Todos" 
                        onClick={() => handleTagSelectionAll()}
                        isActive={tagsSelected.length === 0} //if
                    />
                </li>
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText 
                                title={tag.name}
                                onClick={() => handleTagSelection(tag.name)}
                                isActive={tagsSelected.includes(tag.name)} 
                            />
                        </li>
                        
                    ))
                }

            </Menu>

            <Search>
                <Input 
                    placeholder="Pesquisar pelo título" 
                    icon={FiSearch} 
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Search>

            <Content>
                <Section title="Minhas notas">
                    {
                        notes.map(note => (
                            <Note 
                                key={String(note.id)}
                                data={note}         
                                onClick={() => handleDetails(note.id)}
                            />

                        ))
                    }
                </Section>
            </Content>

            <NewNote to="/New">
                <FiPlus />
                Criar nota
            </NewNote>

        </Container>

    );
}