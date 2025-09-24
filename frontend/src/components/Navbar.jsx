import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
	MdAddHome,
	MdHomeWork,
	MdInfo,
	MdPermContactCalendar,
} from "react-icons/md";
import { RiCheckboxMultipleBlankFill } from "react-icons/ri";
import AddPropertyModal from "./AddPropertyModal";
import useAuthCheck from "../hooks/useAuthCheck";
import ProtectedNavLink from "../utils/ProtectedNavLink";
import ContactModal from "./ContactModal";

const Navbar = ({ containerStyles }) => {
	const [modalOpened, setModalOpened] = useState(false);
	const [Opened, setOpened] = useState(false);
	const { validateLogin } = useAuthCheck();

	const handleAddPropertyClick = () => {
		if (validateLogin()) {
			setModalOpened(true);
		}
	};

	const handleContactClick = () => {
		if (validateLogin) {
			setOpened(true);
		}
	};

	return (
		<nav className={`${containerStyles}`}>
			<NavLink
				to={"/"}
				className={({ isActive }) =>
					isActive
						? "active-link flexCenter gap-x-1 rounded-full px-2 py-1"
						: "flexCenter gap-x-1 rounded-full px-2 py-1"
				}
			>
				<MdHomeWork />
				<div> Home </div>{" "}
			</NavLink>{" "}
			<ProtectedNavLink
				to={"/collection"}
				className={({ isActive }) =>
					isActive
						? "active-link flexCenter gap-x-1 rounded-full px-2 py-1"
						: "flexCenter gap-x-1 rounded-full px-2 py-1"
				}
			>
				<RiCheckboxMultipleBlankFill />
				<div> Collection </div>{" "}
			</ProtectedNavLink>{" "}
			<div
				onClick={handleContactClick}
				className={"flexCenter gap-x-1 rounded-full px-2 py-1 cursor-pointer"}
			>
				<MdPermContactCalendar />
				<div> Contact </div>{" "}
			</div>{" "}
			<ContactModal opened={Opened} setOpened={setOpened} />{" "}
			<div
				onClick={handleAddPropertyClick}
				className={"flexCenter gap-x-1 rounded-full px-2 py-1 cursor-pointer"}
			>
				<MdAddHome />
				<div> Add property </div>{" "}
			</div>{" "}
			<AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />{" "}
			<ProtectedNavLink
				to={"/information"}
				className={({ isActive }) =>
					isActive
						? "active-link flexCenter gap-x-1 rounded-full px-2 py-1"
						: "flexCenter gap-x-1 rounded-full px-2 py-1"
				}
			>
				<MdInfo />
				<div> Information </div>
			</ProtectedNavLink>{" "}
		</nav>
	);
};

export default Navbar;
