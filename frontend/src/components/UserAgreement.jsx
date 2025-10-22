import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFileContract,
	faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import "../UserAgreement.css";



const UserAgreement = ({handleAccept, handleClose}) => {
	return (
		<div className="wrapper flex-align-justify">
			<div className="terms_conditions">
				<div className="tc_item tc_head flex-align-justify">
					<div className="text">
						<h2 className="tc_title font-medium font-sans-serif">
							TERMS & CONDITIONS (USER AGREEMENT)
						</h2>
					</div>
				</div>
				<div className="tc_item tc_body">
					<ul>
						<li>
							<h5>
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{ color: "#55e88f" }}
									className="FIcon"
								/>
								I will practice ethical wildlife photography without disturbing
								or harming animals.
							</h5>
						</li>
						<li>
							<h5>
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{ color: "#55e88f" }}
									className="FIcon"
								/>
								I will only upload authentic and accurate wildlife data (photos,
								species names, locations).
							</h5>
						</li>
						<li>
							<h5>
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{ color: "#55e88f" }}
									className="FIcon"
								/>
								I will not disclose exact locations of sensitive or endangered
								species.
							</h5>
						</li>
						<li>
							<h5>
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{ color: "#55e88f" }}
									className="FIcon"
								/>
								I will comply with all wildlife protection laws and protected
								area rules when collecting data.
							</h5>
						</li>
						<li>
							<h5>
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{ color: "#55e88f" }}
									className="FIcon"
								/>
								I will respect the intellectual property rights of others and
								not upload stolen or copyrighted material without permission.
							</h5>
						</li>
						<li>
							<h5>
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{ color: "#55e88f" }}
									className="FIcon"
								/>
								I will not use this platform for illegal, commercial or
								exploitative purposes without proper approval.
							</h5>
						</li>
						<li>
							<h5>
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{ color: "#55e88f" }}
									className="FIcon"
								/>
								I will keep my login credentials private and never share my
								account.
							</h5>
						</li>
						<li>
							<h5>
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{ color: "#55e88f" }}
									className="FIcon"
								/>
								I understand that false, misleading or harmful uploads will be
								removed and may lead to account suspension.
							</h5>
						</li>
						<li>
							<h5>
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{ color: "#55e88f" }}
									className="FIcon"
								/>
								I accept that my data may be used for research, conservation and
								educational purposes, under secure conditions.
							</h5>
						</li>
						<li>
							<h5>
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{ color: "#55e88f" }}
									className="FIcon"
								/>
								I agree that the platform may suspend or terminate my account if
								I break these rules.
							</h5>
						</li>
					</ul>
				</div>
				<div className="tc_item tc_foot flex-align">
					<button className="tc_decline_btn" onClick={handleClose}>Decline</button>
					<button className="tc_accept_btn" onClick={handleAccept}>Accept</button>
				</div>
			</div>
		</div>
	);
};

export default UserAgreement;
