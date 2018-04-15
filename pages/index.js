import Layout from 'components/Layout';
import Login from 'components/Login';
import MainScreen from 'components/MainScreen';

import R from 'ramda';
import fetch from 'isomorphic-fetch';

export default class extends React.Component {
    static async getInitialProps({ req, res }) {
        try {
            const baseApiUrl = `${req.protocol}://${req.get('host')}/api`;
            /*const playlists = await fetch(baseApiUrl + '/playlists');
            const playlistJson = await playlists.json();
            return {
                playlists: playlistJson,
            };*/
            return {}
        } catch (err) {
            console.log(err);
            return {};
        }
    }

    state = {
        loaded: false,
        logged: false,
    };

    componentDidMount() {
        this.setState({
            logged: !!window.localStorage.getItem('name') || false,
            loaded: true,
        });
    }

    render() {
        const { loaded, logged } = this.state;
        return (
            <Layout>
                {loaded ? logged ? <MainScreen /> : <Login /> : null}
            </Layout>
        );
    }
}
