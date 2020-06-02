import express from "express";

const app = express();

app.get("/users", (req, res) => {
	res.json(["Tiago", "Felipe", "Diego", "Robson"]);
});

app.listen(3333);
