import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Card from "../../components/Card";

import api from "../../services/api";

import logo from "../../assets/logo.svg";

import "./styles.css";

interface Point {
	name: string;
	image_url: string;
	uf: string;
	city: string;
	whatsapp: string;
	email: string;
}

const ShowPoints = () => {
	const [pointsFound, setPointsfound] = useState(0);

	const location = useLocation();

	useEffect(() => {
		const selections: any = location.state;

		const uf = selections.detail.selectedUf;
		const city = selections.detail.selectedCity;

		api
			.get(
				`http://localhost:3333/points?city=${city}&uf=${uf}&items=1,2,3,4,5,6`
			)
			.then(response => {
				setPointsfound(response.data.length);
			});
	}, [location]);

	return (
		<div id="page-show-points">
			<header>
				<img src={logo} alt="Ecoleta" />
				<Link to="/">
					<FiArrowLeft />
					Voltar para home
				</Link>
			</header>

			<p>
				<strong>{pointsFound} pontos</strong> encontrados
			</p>

			<Card />
		</div>
	);
};

export default ShowPoints;
