import React from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import Layout from 'components/Layout';
import WithInput from 'components/WithInput';
import axios from 'axios';

export default class extends React.Component {
    createPlaylist(name) {
        axios
            .post('/api/new/playlist', {
                name: name,
                author: window.localStorage.getItem('name'),
            })
            .then(_ => {
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
                            <Input {...props} type="text" />
                            <Button
                                onClick={() =>
                                    this.createPlaylist(props.inputValue)
                                }
                                style={{ margin: 'auto' }}
                            >
                                Crear
                            </Button>
                        </React.Fragment>
                    )}
                </WithInput>
            </Layout>
        );
    }
}
