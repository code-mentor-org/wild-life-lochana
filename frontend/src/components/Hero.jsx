import React from "react";
import { Link } from "react-router-dom";
import ProtectedNavLink from "../utils/ProtectedNavLink";

const Hero = () => {
	return (
		<section className="max-padd-container pt-[99px]">
			<div className="max-padd-container bg-hero bg-center bg-cover bg-no-repeat h-[655px] w-full rounded-3xl">
				<div className="relative top-30 xs:top-40">
					<span className="medium-18">
						Welcome to Wild-Life Photography Plathform
					</span>
					<h1 className="h1 capitalize max-w-[40rem]">
						Capture the beauty of nature with our wildlife photography platform
					</h1>
					<p className="my-10 max-w-[33rem]">
						Explore real-time wildlife sightings, safe trails and species info
						with our platform. Connect with fellow photographers and capture
						nature responsibly, all in one place. Explore a world of stunning
						wildlife images and connect with passionate photographers...!!!
					</p>
					{/* {button} */}
					<div className="inline-flex items-center justify-center gap-4 p-2 bg-white rounded-xl">
						<div className="text-center regular-14 leading-tight pl-5">
							<h5 className="upperncase font-bold">100% Accuracy</h5>
							<p className="reguler-14">Of All Information</p>
						</div>
						<ProtectedNavLink
							to={"/collection"}
							className="btn-secondary rounded-xl flexCenter !py-5"
						>
							Get It Now
						</ProtectedNavLink>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
