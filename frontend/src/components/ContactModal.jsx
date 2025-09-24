import { Modal } from "@mantine/core";
import React from "react";
import "../Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEnvelope,
	faIdCard,
	faPhoneSquare,
	faStreetView,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
	faFacebookSquare,
	faInstagramSquare,
	faSquareYoutube,
	faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import Swal from "sweetalert2";

const ContactModal = ({ opened, setOpened }) => {
	const onSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);

		formData.append("access_key", "607381c5-b67c-48e6-b056-90f1f2cf51d6");

		const object = Object.fromEntries(formData);
		const json = JSON.stringify(object);

		const res = await fetch("https://api.web3forms.com/submit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: json,
		}).then((res) => res.json());

		if (res.success) {
			Swal.fire({
				title: "Message sent successfully!",
				text: "Thank you very much for joining us.",
				icon: "success",
			});
		}
	};

	return (
		<Modal
			opened={opened}
			onClose={() => setOpened(false)}
			closeOnClickOutside
			size={"90rem"}
		>
			<>
				<div className="containerr">
					<h1 className="h1"> Contact Us </h1>
					<p className="sub-title">
						Please contact us! Any questions or remarks? Just write us a
						message!{" "}
					</p>

					<div id="contact-container">
						<div className="contact-info">
							<h4 className="h4">Contact Information</h4>
							<p className="p">
								Fill up the form and our Team will get back to you within 24
								hours.
							</p>
							<div className="icon-text">
								<FontAwesomeIcon icon={faPhoneSquare} />
								<span className="span">+94 75-783-6574</span>
							</div>
							<div className="icon-text">
								<FontAwesomeIcon icon={faEnvelope} />
								<span className="span">lochanabandara36@gmail.com</span>
							</div>
							<div className="icon-text">
								<FontAwesomeIcon icon={faStreetView} />
								<span className="span">
									NO: 272/A/7, Gampaha, Colombo, Sri Lanka.
								</span>
							</div>
							<div className="social-media">
								<a className="icon-circle">
									<FontAwesomeIcon icon={faFacebookSquare} />
								</a>
								<a className="icon-circle">
									<FontAwesomeIcon icon={faTwitterSquare} />
								</a>
								<a className="icon-circle">
									<FontAwesomeIcon icon={faInstagramSquare} />
								</a>
								<a className="icon-circle">
									<FontAwesomeIcon icon={faSquareYoutube} />
								</a>
							</div>
						</div>
						<form onSubmit={onSubmit} className="form">
							<div className="col">
								<div className="form-group">
									<label className="label">
										<FontAwesomeIcon icon={faUser} className="FIcon" />
										Full Name
									</label>
									<input
										name="name"
										className="input"
										type="text"
										placeholder="Alexander Pierce"
										required
									/>
								</div>
								<div className="form-group">
									<label className="label">
										<FontAwesomeIcon icon={faIdCard} className="FIcon" />
										NIC
									</label>
									<input
										name="NIC"
										className="input"
										type="text"
										placeholder="Enter your NIC"
										required
									/>
								</div>
							</div>
							<div className="col">
								<div className="form-group">
									<label className="label">
										<FontAwesomeIcon icon={faEnvelope} className="FIcon" />
										E-Mail
									</label>
									<input
										name="email"
										className="input"
										type="email"
										placeholder="example@gmail.com"
										required
									/>
								</div>
								<div className="form-group">
									<label className="label">
										<FontAwesomeIcon icon={faPhoneSquare} className="FIcon" />
										Phone
									</label>
									<input
										name="mobile"
										className="input"
										type="tel"
										placeholder="Enter your mobile"
										required
									/>
								</div>
							</div>
							<div className="col">
								<div className="form-group">
									<label className="label-what">
										What kind of person are you?
									</label>
									<div id="radio-buttons">
										<div className="radio-button">
											<input
												className="input"
												id="radioA_Photographer"
												type="radio"
												name="type"
												value="Photographer"
											/>
											<label className="label" for="radioA_Photographer">
												Photographer
											</label>
										</div>
										<div className="radio-button">
											<input
												className="input"
												id="radioA_Tourist"
												type="radio"
												name="type"
												value="Tourist"
											/>
											<label className="label" for="radioA_Tourist">
												Tourist
											</label>
										</div>
										<div className="radio-button">
											<input
												className="input"
												id="radioOther"
												type="radio"
												name="type"
												value="Other"
											/>
											<label className="label" for="radioOther">
												Other
											</label>
										</div>
									</div>
								</div>
							</div>
							<div className="col">
								<div className="form-group solo">
									<label className="label-message">Message</label>
									<textarea
										name="message"
										className="textarea"
										placeholder="Write your massage..."
										required
									></textarea>
								</div>
							</div>
							<div className="col">
								<div className="form-group">
									<button type="submit" className="button-send">
										Send Message
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</>
		</Modal>
	);
};

export default ContactModal;
