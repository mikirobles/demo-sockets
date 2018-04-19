import styled from 'styled-components';
import axios from 'axios';
import React from 'react';
import Button from 'components/Button';

// language=LESS
const MainScreenWrapper = styled.div`
    h1 {
        margin: 1em 0;
    }

    li {
        list-style-type: none;
        padding: 1em;
        margin: 0.5em 0;
        background: #00000010;
        position: relative;
        &:hover {
            background: rgba(0, 0, 255, 0.13);
        }
        line-height: 1.4em;

        span {
            opacity: 0.4;
        }
    }

    .loading-img {
        display: flex;
        margin: 1em;
    }

    .delete {
        position: absolute;
        top: 0.5em;
        right: 0.75em;
        cursor: pointer;
        padding: 0.5em;
        border-radius: 5px;
        background: #7f1c12;
        color: white;
        font-weight: bold;
    }
`;

const PlaylistList = ({ playlists, deletePlaylist }) => (
    <div>
        {playlists.map((playlist, i) => (
            <li key={i}>
                {playlist.name}
                <br />
                <span>{playlist.author}</span>
                {playlist.author === window.localStorage.getItem('name') && (
                    <button
                        onClick={() => deletePlaylist(playlist.id)}
                        className={'delete'}
                    >
                        X
                    </button>
                )}
            </li>
        ))}
    </div>
);

export default class extends React.Component {
    state = {
        playlists: [],
        loaded: false
    };

    componentDidMount() {
        appSocket.on('updatePlaylists', _ => {
            this.getPlaylists();
        });
        this.getPlaylists();
    }

    getPlaylists = () => {
        this.setState({
            loaded: false
        });
        axios('/api/get/playlists').then(playlists => {
            this.setState({
                playlists: playlists.data,
                loaded: true
            });
        });
    };

    deletePlaylist = async id => {
        const deletingPlaylist = this.state.playlists.find(
            playlist => playlist.id === id
        );
        this.setState(({ playlists }) => ({
            playlists: playlists.filter(playlist => playlist.id !== id)
        }));
        try {
            axios.delete(`/api/delete/playlist/${id}`);
            window.appSocket.emit('delete playlist', {
                playlist: deletingPlaylist
            });
        } catch (err) {
            this.setState(
                this.setState(({ playlists }) => ({
                    playlists: [...playlists, deletingPlaylist]
                }))
            );
        }
    };

    render() {
        const { playlists, loaded } = this.state;
        return (
            <MainScreenWrapper>
                <h1>Lista de playlists:</h1>
                {loaded ? (
                    <PlaylistList
                        deletePlaylist={this.deletePlaylist}
                        playlists={playlists}
                    />
                ) : (
                    <img
                        className={'loading-img'}
                        src="../../static/loading.svg"
                        alt=""
                    />
                )}
                <Button onClick={() => window.location.replace('/create')}>
                    Crear playlist
                </Button>
            </MainScreenWrapper>
        );
    }
}
