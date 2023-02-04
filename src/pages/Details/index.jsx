import { Container, Links, Content } from './styles';

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { Tag } from '../../components/Tag'
import { ButtonText } from '../../components/ButtonText';

export function Details() {
  
  return (
    <Container>
      <Header />

      <main>
        <Content>
          <ButtonText title="Excluir nota"/>

          <h1>
            Introdução ao React
          </h1>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
            Tempora repudiandae magni rerum porro explicabo nulla. Saepe, eum, 
            error a esse aut et excepturi architecto hic eius nobis doloribus nisi alias.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
            Tempora repudiandae magni rerum porro explicabo nulla. Saepe, eum, 
            error a esse aut et excepturi architecto hic eius nobis doloribus nisi alias.
          </p>


          <Section title="Links úteis">
            <Links>
              <li><a href="#">Item 1</a></li>
              <li><a href="#">Item 2</a></li>
              <li><a href="#">Item 3</a></li>
            </Links>
          </Section>

          <Section title="Links úteis">
            <Tag title="express" />
            <Tag title="node" />
          </Section>

          <Button title="Voltar"/>

        </Content>
      </main>
    </Container>
  )
}