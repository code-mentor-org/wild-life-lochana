import React, { useContext, useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { createUser } from "../utils/api";
import UserDetailContext from "../context/userDetailContext";
import useFavourites from "../hooks/useFavourites";
import useBookings from "../hooks/useBookings";
import ChatForm from "../components/ChatForm";
import ChatMessage from "../components/ChatMessage";
import { WildlifePhotographyPlatformInfo } from "../constant/WildlifePhotographyPlatformInfo";
import ChatbotIcon from "./ChatbotIcon";
import "../Chatbot.css";

const Layout = () => {
	useFavourites();
	useBookings();

	const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
	const { setUserDetails } = useContext(UserDetailContext);
	const { mutate } = useMutation({
		mutationKey: [user?.email],
		mutationFn: () => createUser(user?.email),
	});

	useEffect(() => {
		const getTokenAndRegister = async () => {
			const res = await getAccessTokenWithPopup({
				authorizationParams: {
					audience: "http://localhost:8000",
					scope: "openid profile email",
				},
			});
			localStorage.setItem("access_token", res);
			setUserDetails((prev) => ({ ...prev, token: res }));
			// console.log(res)
			mutate(res);
		};
		isAuthenticated && getTokenAndRegister();
	}, [isAuthenticated]);

	const [chatHistory, setChatHistory] = useState([
		{
			hideInChat: true,
			role: "model",
			text: WildlifePhotographyPlatformInfo,
		},
	]);
	const [showChatbot, setShowChatbot] = useState(false);

	const chatBodyRef = useRef();

	const generateBotResponse = async (history) => {
		// Helper function to update chat history
		const updateHistory = (text, isError = false) => {
			setChatHistory((prev) => [
				...prev.filter((msg) => msg.text !== "Thinking..."),
				{ role: "model", text, isError },
			]);
		};

		// Format chat history for API request
		history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ contents: history }),
		};

		try {
			// Make the API call to get the bot's response
			const response = await fetch(
				import.meta.env.VITE_API_URL,
				requestOptions
			);
			const data = await response.json();
			if (!response.ok)
				throw new Error(data.error.message || "Something went wrong!");

			// Clean and update chat history with bot's response
			const apiResponseText = data.candidates[0].content.parts[0].text
				.replace(/\*\*(.*?)\*\*/g, "$1")
				.trim();
			updateHistory(apiResponseText);
		} catch (error) {
			updateHistory(error.message, true);
		}
	};

	useEffect(() => {
		// Auto-scroll whenever chat history updates
		chatBodyRef.current.scrollTo({
			top: chatBodyRef.current.scrollHeight,
			behavior: "smooth",
		});
	}, [chatHistory]);

	return (
		<>
			<div>
				<Header />
				<Outlet />
			</div>
			<Footer />
			<div className="">
				<div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
					<button
						onClick={() => setShowChatbot((prev) => !prev)}
						id="chatbot-toggler"
					>
						<span className="material-symbols-rounded">mode_comment</span>
						<span className="material-symbols-rounded">close</span>
					</button>
					<div className="chatbot-popup">
						{/* Chatbot Header */}
						<div className="chat-header">
							<div className="header-info">
								<ChatbotIcon />
								<h2 className="logo-text">WildGuide</h2>
							</div>
							<button
								onClick={() => setShowChatbot((prev) => !prev)}
								className="material-symbols-rounded"
							>
								keyboard_arrow_down
							</button>
						</div>

						{/* Chatbot Body */}
						<div ref={chatBodyRef} className="chat-body">
							<div className="message bot-message">
								<ChatbotIcon />
								<p className="message-text">
									Hey there 👋 <br /> How can I help you today?
								</p>
							</div>

							{/* {Render the chat history dynamically} */}
							{chatHistory.map((chat, index) => (
								<ChatMessage key={index} chat={chat} />
							))}
						</div>

						{/* Chatbot Footer */}
						<div className="chat-footer">
							<ChatForm
								chatHistory={chatHistory}
								setChatHistory={setChatHistory}
								generateBotResponse={generateBotResponse}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Layout;
