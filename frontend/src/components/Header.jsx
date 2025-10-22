import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { MdClose, MdMenu } from "react-icons/md";
import userIcon from "../assets/user.svg";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "./ProfileMenu";
import axios from "axios";
import { Modal } from '@mantine/core';
import UserAgreement from "../components/UserAgreement";

const getCookie = (name) => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
	return null;
};

const setCookie = (name, value, days = 365) => {
	const expires = new Date();
	expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const Header = () => {
	const [active, setActive] = useState(false);
	const [menuOpened, setMenuOpened] = useState(false);
	const [isModal, setIsModal] = useState(false);
	const toggleMenu = () => setMenuOpened(!menuOpened);
	const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

	const handleSaveUser = async () => {
		try {
			const response = await axios.post(`http://localhost:8000/api/user/register`, { email: user.email });
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	const handleLogin = () => {
		const hasAccepted = getCookie('termsAccepted');
		
		// If user hasn't accepted terms, show modal first
		if (!hasAccepted) {
			setIsModal(true);
		} else {
			// If already accepted, proceed with login
			loginWithRedirect();
		}
	};

	const closeModel = () => {
		// User declined - close modal and don't allow login
		setIsModal(false);
		// Optionally show a message
		alert("You must accept the Terms & Conditions to login.");
	};

	const acceptHandle = () => {
		// User accepted - save cookie and proceed with login
		setCookie('termsAccepted', 'true');
		setIsModal(false);
		// Now proceed with login after acceptance
		loginWithRedirect();
	};

	useEffect(() => {
		if (isAuthenticated && user) {
			handleSaveUser();
		}
	}, [isAuthenticated, user]);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				// close the menu if open when scrolling occurs
				if (menuOpened) {
					setMenuOpened(false);
				}
			}
			// detect scroll
			setActive(window.scrollY > 40);
		};
		window.addEventListener("scroll", handleScroll);
		// clean up the event listener on component unmounts
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [menuOpened]);

	return (
		<header className="max-padd-container fixed top-1 w-full left-0 right-0 z-50">
			{/* Container */}
			<div
				className={`${
					active ? "py-0" : "py-1"
				} max-padd-container bg-white transition-all duration-200 rounded-full px-5 ring-1 ring-slate-900/5`}
			>
				<div className="flexBetween py-3">
					{/* Logo */}
					<Link to={"/"}>
						<span className="font-[900] text-[24px]">
							WILD<span className="font-[600] medium-20"> LIFE</span>
						</span>
					</Link>
					{/* Navbar */}
					<div className="flexCenter gap-x-4">
						{/* Desktop Navbar */}
						<Navbar
							containerStyles={
								"hidden xl:flex gap-x-5 xl:gap-x-10 capitalize medium-15 ring-1 ring-slate-900/10 rounded-full p-2 bg-primary"
							}
						/>
						{/* Mobile Navbar */}
						<Navbar
							containerStyles={`${
								menuOpened
									? "flex items-start flex-col gap-y-8 capitalize fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 z-50"
									: "flex items-start flex-col gap-y-8 capitalize fixed top-20 -right-[100%] p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300"
							}`}
						/>
					</div>
					{/* Buttons */}
					<div className="flexBetween gap-x-3 sm:gap-x-5 bold-16">
						{!menuOpened ? (
							<MdMenu
								onClick={toggleMenu}
								className="xl:hidden cursor-pointer text-3xl hover:text-secondary"
							/>
						) : (
							<MdClose
								onClick={toggleMenu}
								className="xl:hidden cursor-pointer text-3xl hover:text-secondary"
							/>
						)}
						{!isAuthenticated ? (
							<button
								onClick={handleLogin}
								className="btn-secondary flexCenter gap-x-2 medium-16 rounded-full"
							>
								<img src={userIcon} alt="" height={22} width={22} />
								<span>Login</span>
							</button>
						) : (
							<ProfileMenu user={user} logout={logout} />
						)}
					</div>
				</div>
			</div>
			<Modal
				opened={isModal}
				withCloseButton={false}
				centered
				onClose={closeModel}
				title={
					<div className="flex w-full items-center">
						<h2 className="text-md font-medium">Terms & Conditions</h2>
					</div>
				}
			>
				<UserAgreement
					handleClose={closeModel}
					handleAccept={acceptHandle}
				/>
			</Modal>
		</header>
	);
};

export default Header;