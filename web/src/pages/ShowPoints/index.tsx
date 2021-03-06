import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Card from "../../components/Card";

import api from "../../services/api";

import logo from "../../assets/logo.svg";

import "./styles.css";

interface Point {
	id: string;
	name: string;
	image_url: string;
	uf: string;
	city: string;
	email: string;
	whatsapp: string;
}

const ShowPoints = () => {
	const [pointsFound, setPointsfound] = useState<Array<Point>>([]);

	const location = useLocation();

	useEffect(() => {
		const selections: any = location.state;

		const uf = selections.detail.selectedUf;
		const city = selections.detail.selectedCity;

		api
			.get<Point[]>(`points?city=${city}&uf=${uf}&items=1,2,3,4,5,6`)
			.then(response => setPointsfound(response.data));
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
				<strong>{pointsFound.length} pontos</strong> encontrados
			</p>

			<main>
				{pointsFound.map(point => (
					<Card
						key={point.id}
						image={point.image_url}
						name={point.name}
						uf={point.uf}
						city={point.city}
						email={point.email}
						whatsapp={point.whatsapp}
					/>
				))}
			</main>
		</div>
	);
};

export default ShowPoints;
