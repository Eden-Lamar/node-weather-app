const weatherForm = document.querySelector("form");
const search = document.querySelector("form input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
	e.preventDefault();
	const location = search.value;

	message1.textContent = "Loading...";
	message2.textContent = "";

	fetch(`/weather?address=${location}`).then(res => {
		res.json().then(data => {
			if (data.error) {
				message1.textContent = data.error;
				message2.textContent = "";
			} else {
				message1.textContent = data.location;
				message2.textContent = data.forecast;
			}
		});
	});
	console.log(location);
});
