import styled from 'styled-components';
import axios from 'axios';
import React from 'react';
import Button from 'components/Button';

const MainScreenWrapper = styled.div`
    h1 {
        margin: 1em 0;
    }
    li {
        list-style-type: none;
        padding: 1em;
        margin: 0.5em 0;
        background: #00000010;
        &:hover {
            background: rgba(0, 0, 255, 0.13);
        }
        line-height: 1.4em;

        span {
            opacity: 0.4;
        }
    }
`;

const PlaylistList = ({ playlists }) => (
    <div>
        {playlists.map((playlist, i) => (
            <li key={i}>
                {playlist.name}
                <br />
                <span>{playlist.author}</span>
            </li>
        ))}
    </div>
);

export default class extends React.Component {
    state = {
        playlists: [],
    };

    componentDidMount() {
        axios('/api/get/playlists').then(playlists => {
            this.setState({
                playlists: playlists.data,
            });
        });
    }

    render() {
        const { playlists } = this.state;
        return (
            <MainScreenWrapper>
                <h1>Lista de playlists:</h1>
                {playlists ? (
                    <PlaylistList playlists={playlists} />
                ) : (
                    <img
                        src="https://loading.io/spinners/color-bar/index.colorful-progress-loader.svg"
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
