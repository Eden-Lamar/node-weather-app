const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const path = require("path");
const express = require("express");
const hbs = require("hbs");
	
const app = express();
const port = process.env.PORT||3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Eden Lamar"
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About",
		name: "Eden Lamar"
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		helpText: "This is some helpful text",
		title: "Help",
		name: "Eden Lamar"
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "You must provide an address!"
		});
	}

	geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
		if (error) {
			return res.send({ error: error });
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error: error });
			}
			res.send({
				location: location,
				forecast: forecastData, 
				address: req.query.address
			});
			// console.log(location);
			// console.log(forecastData);
		});
	});
});

/* app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search term"
		});
	}

	console.log(req.query.search);
	res.send({
		products: []
	});
});
*/

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404 Page",
		name: "Eden Lamar",
		errorMessage: "Help page not found"
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404 Page",
		name: "Eden Lamar",
		errorMessage: "Page not found"
	});
});

app.listen(port, () => {
	console.log("Server is up on port " + port );
});
 