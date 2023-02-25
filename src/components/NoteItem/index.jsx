import { FiPlus, FiX } from 'react-icons/fi';

import { Container } from './styles';

export function NoteItem({ isNew, value, onClick, ...rest }) {
    return (
        <Container isNew={isNew}>
            <input type="text"
                value={value}
                readOnly={!isNew} //Se não é novo, bloqueia o input.
                {...rest}
            />

            <button 
                onClick={onClick}
                type="button"
                {...rest}
                className={isNew ? 'button-add' : 'button-delete'}
            >
                {isNew ? <FiPlus /> : <FiX /> /*Se é novo, adiciona o incone X*/ }
            </button>
        </Container>
    )
}