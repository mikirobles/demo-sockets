import WithInput from 'components/WithInput';
import Button from 'components/Button';
import Input from 'components/Input';
import styled from 'styled-components';
import axios from 'axios';

const LoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
`;

const onSubmit = inputValue => {
    try {
        axios
            .post('/api/new/user', {
                name: inputValue,
            })
            .then(response => {
                window.localStorage.setItem('name', inputValue);
                window.localStorage.setItem('id', response.data);
                window.location.reload();
            });
    } catch (err) {
        alert(err);
    }
};

export const DumbLogin = ({ inputValue, onChange }) => (
    <LoginWrapper>
        <h1>Como es tu nombre?</h1>
        <Input
            placeholder={'Escribe aquí'}
            onChange={onChange}
            value={inputValue}
            type="text"
        />
        <Button onClick={() => onSubmit(inputValue)}>Entrar</Button>
    </LoginWrapper>
);

const Login = () => <WithInput>{DumbLogin}</WithInput>;

export default Login;
