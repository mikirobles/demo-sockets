import React from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import Layout from 'components/Layout';
import WithInput from 'components/WithInput';
import axios from 'axios';

export default class extends React.Component {
    createPlaylist(name) {
        const playlist = {
            name: name,
            author: window.localStorage.getItem('name')
        };
        axios.post('/api/new/playlist', playlist).then(_ => {
            window.appSocket.emit('create playlist', {
                name: window.localStorage.getItem('name'),
                playlist
            });
            window.location.replace('/');
        });
    }

    render() {
        return (
            <Layout>
                <WithInput>
                    {props => (
                        <React.Fragment>
                            <h1>Nombre de la playlist:</h1>
                            <form>
                                <Input {...props} type="text" />
                                <Button
                                    type={'submit'}
                                    onClick={e => {
                                        e.preventDefault();
                                        this.createPlaylist(props.inputValue);
                                    }}
                                    style={{ margin: 'auto' }}
                                >
                                    Crear
                                </Button>
                            </form>
                        </React.Fragment>
                    )}
                </WithInput>
            </Layout>
        );
    }
}
