import { Link } from "react-router-dom";
import { PATHS } from "../../route/routes";
import {styled} from "styled-components";

function Header () {
    const HeaderStyled = styled.header`
        display: flex;
        align-items: center;
        justify-content:space-between;
        min-height: 60px;
        width: 100%;
    `;
    return (
        <HeaderStyled>
            <nav>
                <Link to={PATHS.HOME}>Home</Link>
                <Link to={PATHS.ABOUT}>About</Link>
            </nav>
            <nav>
                <Link to={PATHS.SIGNIN}>Sign In</Link>
                <Link to={PATHS.SIGNUP}>Sign Up</Link>
            </nav>
        </HeaderStyled>
    );
};

export default Header;
