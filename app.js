"use strict";
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".mcountries");
let xhr, countriesList, countriesArr;
let endPoint = "https://restcountries.com/v2/all";
function loadCountries() {
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = processCountries;
	xhr.open("GET", endPoint, true);
	xhr.send(null);
}
const getCountryData = function (data) {
	// const request = new XMLHttpRequest();
	// request.open("GET", `https://restcountries.com/v2/name/${country}`);
	// request.send();

	// request.addEventListener("load", function () {
	// 	console.log(this.responseText);
	// 	const [data] = JSON.parse(this.responseText);
	// 	console.log(data);
	let lang = "";
	let currency = "";
	if ("languages" in data) {
		lang = data.languages[0].name;
	}
	if ("currencies" in data) {
		currency = data.currencies[0].name;
	}
	const html = `
  <article class="mcountry">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
	  <hr/>
      <div class="country_details"><p class="country__row"><span>👫</span>${(
				+data.population / 1000000
			).toFixed(1)} million</p>
      <p class="country__row"><span>🗣️</span>${lang}</p>
	  <p class="country__row"><span >💰</span>${currency}</p></div>
    </div>
  </article>
  `;
	countriesContainer.innerHTML = html;
	countriesContainer.style.opacity = 1;
};
function processCountries() {
	if (xhr.readyState == 4 && xhr.status == 200) {
		countriesList = document.getElementById("countries");
		countriesArr = JSON.parse(xhr.responseText);
		let countryNames = "";
		countriesArr.forEach((c) => {
			countryNames += `<option>${c.name}</option>`;
		});
		countriesList.innerHTML = countryNames;
	} else if (xhr.readyState == 4 && xhr.status !== 200) {
		alert("Sorry! The request cannot be processed\nReason:" + xhr.statusText);
	}
}
function showDetails() {
	console.log("called");
	let countryIndex = countriesList.selectedIndex;
	let country = countriesArr[countryIndex];
	console.log(country);
	getCountryData(country);
}
