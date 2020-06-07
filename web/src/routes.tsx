import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import CreatePoint from "./pages/CreatePoint";
import ShowPoints from "./pages/ShowPoints";

const Routes = () => {
	return (
		<BrowserRouter>
			<Route component={Home} path="/" exact />
			<Route component={CreatePoint} path="/create-point" />
			<Route component={ShowPoints} path="/show-points" />
		</BrowserRouter>
	);
};

export default Routes;
