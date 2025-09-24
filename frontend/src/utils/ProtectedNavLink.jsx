import { NavLink } from "react-router-dom";
import useAuthCheck from "../hooks/useAuthCheck";

const ProtectedNavLink = ({ to, children, ...props }) => {
	const { validateLogin } = useAuthCheck();

	const handleClick = (e) => {
		if (!validateLogin()) {
			e.preventDefault(); // stop nav
		}
	};

	return (
		<NavLink to={to} onClick={handleClick} {...props}>
			{children}
		</NavLink>
	);
};

export default ProtectedNavLink;
