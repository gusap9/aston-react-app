import { Link, useMatch } from "react-router-dom";

function CustomLink({ children, to, ...props }) {
    const match = useMatch(to);
    return (
        <Link
            to={to}
            style={{
                color: match ? "#BE8022" : "#41522E",
                cursor: match ? "default" : "pointer",
                textDecoration: match ? "underline" : "none",
                fontWeight: match ? "800" : "500",
            }}
            {...props}
        >
            {children}
        </Link>
    );
}

export default CustomLink;
