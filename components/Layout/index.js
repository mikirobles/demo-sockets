import styled from 'styled-components';
import { styleConstants } from 'helpers/index';
import React from 'react';
import io from 'socket.io-client';

import  {NotificationContainer, NotificationManager } from 'react-notifications';

const { colors, breakpoints } = styleConstants;

const LayoutWrapper = styled.div`
    background: ${colors.lightGray};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 1em;
    article {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 100%;
        max-width: 800px;
        padding: 1em;
    }
    @media ${breakpoints.tabletPort} {
        article {
            padding: 1em;
        }
    }
    
`;

export default class extends React.Component {
    componentDidMount() {
        window.appSocket = io.connect('http://192.168.0.120:3000/');
        appSocket.on('notification', (data) => {
            NotificationManager.info(data.message);
        })
    }

    render() {
        const { children } = this.props;
        return (
            <LayoutWrapper>
                <article>{children}</article>
                <NotificationContainer/>
            </LayoutWrapper>
        );
    }
}
