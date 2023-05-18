import styled from 'styled-components';
import { Link } from "react-router-dom";

export const Container = styled(Link)`
    background: none;
    color: ${({ theme, isActive }) => isActive ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100};

    border: none;
    font-size: 1.6rem;
`;