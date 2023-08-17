const darkmode = document.querySelector('.color-mode');
const searchBtn = document.querySelector('#search');
const inputData = document.querySelector('#data');
const filteroption = document.querySelector('#filter');
const countriesContainer = document.querySelector('.countries');
let allCountriesData

	const receive = fetch('https://restcountries.com/v3.1/all')
		.then(res => res.json())
		.then(data => {
			renderCountries(data);
			allCountriesData = data;
		}); 

filteroption.addEventListener('change', (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filteroption.value}`)
    .then((res) => res.json())
    .then(renderCountries)
});


function renderCountries(data) {
  countriesContainer.innerHTML = ''
  data.forEach((country) => {
    const countryCard = document.createElement('div')
    countryCard.classList.add('box')
    countryCard.href = `/country.html?name=${country.name.common}`
    countryCard.innerHTML = `
		<img src="${country.flags.svg}" alt="${country.name.common} flag" />
		<div class="details">
			<h2>${country.name.common}</h2>
			<div class="info">
				<h6>Population:</h6>
				<p>${country.population.toLocaleString(
                'en-IN'
              		)}
				</p>
			</div>
			<div class="info">
				<h6>Region:</h6>
				<p>${country.region}</p>
			</div>
			<div class="info">
				<h6>Capital:</h6>
				<p>${country.capital?.[0]}</p>
			</div>
		</div>
  `
    countriesContainer.append(countryCard)
  })
}



inputData.addEventListener('input', (e) =>{ 
	const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
	renderCountries(filteredCountries)
});


darkmode.addEventListener('click', () =>{
	document.body.classList.toggle("new-class");
});
