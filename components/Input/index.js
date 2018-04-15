import styled from 'styled-components';
import React from 'react';

const Input = styled.input`
    font-size: 2em;
    margin: .5em 0;
    padding: 0.5em;
    width: 100%;
    max-width: 400px;
`;

export default props => <Input {...props} />;
