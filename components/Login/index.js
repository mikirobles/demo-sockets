import WithInput from 'components/WithInput';
import Button from 'components/Button';
import Input from 'components/Input';
import styled from 'styled-components';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

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
                name: inputValue
            })
            .then(response => {
                window.localStorage.setItem('name', inputValue);
                window.localStorage.setItem('id', response.data);
                window.appSocket.emit('user logged', {
                    name: inputValue
                });
                window.location.reload();
            });
    } catch (err) {
        alert(err);
    }
};

export const DumbLogin = ({ inputValue, onChange }) => (
    <LoginWrapper>
        <h1>Como es tu nombre?</h1>
        <form>
            <Input
                placeholder={'Escribe aquí'}
                onChange={onChange}
                value={inputValue}
                type="text"
            />
            <Button
                type={'submit'}
                onClick={e => {
                    e.preventDefault();
                    onSubmit(inputValue);
                }}
            >
                Entrar
            </Button>
        </form>
    </LoginWrapper>
);

const Login = () => <WithInput>{DumbLogin}</WithInput>;

export default Login;
