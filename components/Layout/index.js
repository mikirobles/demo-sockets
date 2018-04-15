import styled from 'styled-components';
import { styleConstants} from "helpers/index";

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

export default ({ children }) => (
    <LayoutWrapper>
        <article>
            {children}
        </article>
    </LayoutWrapper>
);
