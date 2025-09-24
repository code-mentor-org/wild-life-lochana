import React, { useRef } from "react";
import "../Chatbot.css";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
	const inputRef = useRef();

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const userMessage = inputRef.current.value.trim();
		if (!userMessage) return;
		inputRef.current.value = "";

		// Update chat history with the user's message
		setChatHistory((history) => [
			...history,
			{ role: "user", text: userMessage },
		]);

		// Add a "Thinking..." placeholder for the bot's response
		setTimeout(
			() =>
				setChatHistory((history) => [
					...history,
					{ role: "model", text: "Thinking..." },
				]),
			600
		);

		// Call the function to generate the bot's response
		generateBotResponse([
			...chatHistory,
			{
				role: "user",
				text: `Using the details provided above, please address this query: ${userMessage}`,
			},
		]);
	};

	return (
		<form action="#" className="chat-form" onSubmit={handleFormSubmit}>
			<input
				ref={inputRef}
				type="text"
				placeholder="Message..."
				className="message-input"
				required
			/>
			<div className="chat-controls">
				<button
					type="button"
					id="emoji-picker"
					className="material-symbols-rounded"
				>
					sentiment_satisfied
				</button>
				<div className="file-upload-wrapper">
					<input type="file" accept="images/*" id="file-input" hidden />
					<button
						type="button"
						id="file-upload"
						className="material-symbols-rounded"
					>
						attach_file
					</button>
				</div>
				<button
					type="submit"
					id="send-message"
					className="material-symbols-rounded"
				>
					arrow_upward
				</button>
			</div>
		</form>
	);
};

export default ChatForm;
