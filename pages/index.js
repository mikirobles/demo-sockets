import Layout from 'components/Layout';
import Login from 'components/Login';
import MainScreen from 'components/MainScreen';

import R from 'ramda';
import fetch from 'isomorphic-fetch';

export default class extends React.Component {
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
