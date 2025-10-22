import React, { useEffect } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Properties from "../components/Properties";
import Blogs from "../components/Blogs";
import bannerImg from "../assets/banner.png";
import { Modal } from '@mantine/core';
import UserAgreement from "../components/UserAgreement";

// Helper functions for cookie management
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

const Home = () => {
	const [isModal, setIsModal] = React.useState(false);

	const closeModel = () => {
		// User closed without accepting - show again next time
		setIsModal(false);
	};

	const acceptHandle = () => {
		// User accepted - don't show again
		setCookie('termsAccepted', 'true');
		setIsModal(false);
	};

	useEffect(() => {
		// Check if user has already accepted terms
		const hasAccepted = getCookie('termsAccepted');
		// Show modal if user hasn't accepted yet
		if (!hasAccepted) {
			setIsModal(true);
		}
	}, []);

	return (
		<main>
			<Hero />
			<About />
			<Properties />
			<Blogs />
			<Modal
				opened={isModal}
				withCloseButton={false}
				centered
				onClose={closeModel}
				title={
					<div className="flex w-full items-center">
						<h2 className="text-md font-medium">Terms & Conditions</h2>
					</div>
				}>
				<UserAgreement
					handleClose={closeModel}
					handleAccept={acceptHandle}
				/>
			</Modal>
			<div className="max-padd-container py-16 overflow-x-hidden">
				<img src={bannerImg} alt="" />
			</div>
		</main>
	);
};

export default Home;