import React, { useState, FormEvent, useEffect } from "react";
import { FiLogIn, FiSearch } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import Modal from "react-modal";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import "./styles.css";

import logo from "../../assets/logo.svg";
import axios from "axios";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

interface IBGEUFResponse {
	sigla: string;
}

interface IBGECityResponse {
	nome: string;
}

const Home = () => {
	const [cities, setCities] = useState<string[]>([]);
	const [ufs, setUfs] = useState<string[]>([]);

	const [selectedCity, setSelectedCity] = useState("");
	const [selectedUf, setSelectedUf] = useState("");

	const [modalIsOpen, setModalIsOpen] = useState(false);

	const history = useHistory();

	useEffect(() => {
		axios
			.get<IBGEUFResponse[]>(
				"https://servicodados.ibge.gov.br/api/v1/localidades/estados"
			)
			.then(response => {
				const ufInitials = response.data.map(uf => uf.sigla).sort();
				setUfs(ufInitials);
			});
	}, []);

	useEffect(() => {
		if (selectedUf === null) {
			return;
		}

		axios
			.get<IBGECityResponse[]>(
				`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
			)
			.then(response => {
				const cityNames = response.data.map(uf => uf.nome);
				setCities(cityNames);
			});
	}, [selectedUf]);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		setModalIsOpen(false);

		history.push({
			pathname: "/show-points",
			state: { detail: { selectedUf, selectedCity } },
		});
	}

	return (
		<div id="page-home">
			<div className="content">
				<header>
					<img src={logo} alt="Ecoleta" />
					<Link to="/create-point">
						<FiLogIn />
						Cadastre um ponto de coleta
					</Link>
				</header>

				<main>
					<h1>Seu marketplace de coleta de resíduos.</h1>
					<p>
						Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
					</p>

					<button
						className="show-points-link"
						onClick={() => setModalIsOpen(true)}
					>
						<span>
							<FiSearch />
						</span>
						<strong>Pesquisar pontos de coleta</strong>
					</button>

					<Modal
						isOpen={modalIsOpen}
						style={customStyles}
						overlayClassName="modal-home-overlay"
						className="modal-home"
						shouldFocusAfterRender={false}
						contentLabel="Pontos de coleta"
						ariaHideApp={false}
					>
						<h1>Pontos de coleta</h1>
						<form onSubmit={handleSubmit}>
							<Autocomplete
								className="autocomplete-home"
								freeSolo
								inputValue={selectedUf}
								onInputChange={(event, newInputValue) => {
									setSelectedUf(newInputValue);
								}}
								id="combo-box-demo"
								options={ufs}
								renderInput={params => (
									<TextField
										{...params}
										label="Selecione o estado"
										variant="filled"
									/>
								)}
							/>
							<Autocomplete
								className="autocomplete-home"
								freeSolo
								inputValue={selectedCity}
								onInputChange={(event, newInputValue) => {
									setSelectedCity(newInputValue);
								}}
								id="combo-box-demo"
								options={cities}
								renderInput={params => (
									<TextField
										{...params}
										label="Selecione a cidade"
										variant="filled"
									/>
								)}
							/>
							<button type="submit" className="modal-submit">
								Buscar
							</button>
						</form>
					</Modal>
				</main>
			</div>
		</div>
	);
};

export default Home;
