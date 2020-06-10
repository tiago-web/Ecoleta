import React from "react";

import "./styles.css";

interface Props {
	image: string;
	name: string;
	uf: string;
	city: string;
	email: string;
	whatsapp: string;
}

const Card: React.FC<Props> = props => {
	return (
		<div id="card">
			<img src={props.image} alt="Card-img" />
			<h1>{props.name}</h1>
			<p>
				{props.city}, {props.uf}
			</p>
			<h3>Contato</h3>
			<p>
				<strong>E-mail:</strong> {props.email}
			</p>
			<p>
				<strong>Whatsapp:</strong> {props.whatsapp}
			</p>
		</div>
	);
};

export default Card;
