import styled from 'styled-components';

const Button = styled.button`
    font-size: 1.5em;
    width: max-content;
    padding: 0.5em 1em;
    border: none;
    outline: none;
    background: #2432af;
    color: white;
    border-radius: 5px;
    transition: 0.1s ease opacity;
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

export default ({ onClick, children, ...props }) => (
    <Button onClick={onClick} {...props}>{children}</Button>
);
