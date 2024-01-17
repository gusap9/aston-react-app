import { Link } from "react-router-dom";
import { PATHS } from "../../route/routes";


const Navigation = () => {
    return (
        <div>
            <nav>
                <Link to={PATHS.HOME}>Home</Link>
                <Link to={PATHS.ABOUT}>About</Link>
            </nav>
        </div>
    )
};

export default Navigation;
