import React, { Children } from "react";
import { Link } from "react-router-dom";
import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from "../constant/data";
import Swal from "sweetalert2";

const Footer = () => {
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
				title: "Your comment sent successfully!",
				text: "You're now subscribed!! Thank you for subscribing to our website.",
				icon: "success",
			});
		}
	};

	return (
		<footer className="max-padd-container mb-4">
			<div className="max-padd-container bg-primary rounded-tr-3xl pt-12 xl:pt-20 pb-8">
				<h3 className="h3">
					Explore Wildlife Photography Opportunities with Us?{" "}
				</h3>
				<p>
					Explore real-time wildlife sightings, safe trails and species info
					with our platform. Connect with fellow photographers and capture
					nature responsibly, all in one place.
				</p>
				<hr className="my-8 bg-slate-900/30 h-[2px]" />
				{/* {container} */}
				<div className="flex justify-between flex-wrap gap-x-2 gap-y-8">
					<div className="max-w-sm">
						<Link to={"/"} className="flex items-center gap-x-2">
							<span className="font-[900] text-[24px]">
								WILD<span className="font-[600] medium-20"> LIFE</span>
							</span>
						</Link>
						<p className="py-4">
							Wildlife photography captures the beauty and behavior of animals
							in their natural habitats. Our platform supports photographers
							with real-time data, ethical guidance and community features to
							promote safe, informed and responsible wildlife photography
							experiences.
						</p>
						<form onSubmit={onSubmit}>
							<div className="flexBetween pl-6 h-[3.3rem] bg-white w-full max-w-[420px] rounded-full ring-1 ring-slate-500/5">
								<input
									name="email"
									type="email"
									placeholder="Enter your email"
									className="bg-transparent border-none outline-none"
									required
								/>
								<button
									type="submit"
									className="btn-secondary rounded-full relative right-[0.33rem]"
								>
									Subscribe
								</button>
							</div>
						</form>
					</div>
					<div className="flex justify-between flex-wrap gap-8">
						{FOOTER_LINKS.map((col) => (
							<FooterColumn key={col.title} title={col.title}>
								<ul className="flex flex-col gap-4 regular-14 text-gray-20">
									{col.links.map((link) => (
										<Link to={"/"} key={link}>
											{link}
										</Link>
									))}
								</ul>
							</FooterColumn>
						))}
						<div className="flex flex-col gap-5">
							<FooterColumn title={FOOTER_CONTACT_INFO.title}>
								{FOOTER_CONTACT_INFO.links.map((link) => (
									<Link
										to={"/"}
										key={link.label}
										className="flex gap-4 md:flex-col lg:flex-row"
									>
										<p>{link.label}</p>:<p>{link.value}</p>
									</Link>
								))}
							</FooterColumn>
						</div>
						<div className="flex">
							<FooterColumn title={SOCIALS.title}>
								<ul className="flex gap-4">
									{SOCIALS.links.map((link) => (
										<Link to={"/"} key={link.id} className="text-xl">
											{link.icon}
										</Link>
									))}
								</ul>
							</FooterColumn>
						</div>
					</div>
				</div>
			</div>
			{/* {container} */}
			<p className="text-white bg-tertiary medium-14 py-2 px-8 rounded-b-3xl flexBetween">
				<span>2025 WILD LIFE</span>All rights reserved
			</p>
		</footer>
	);
};

export default Footer;

const FooterColumn = ({ title, children }) => {
	return (
		<div className="flex flex-col gap-5">
			<h4 className="bold-18 whitespace-nowrap">{title}</h4>
			{children}
		</div>
	);
};
