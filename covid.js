const countries = document.querySelector('datalist');
const search = document.querySelector('#srch');
const date = document.querySelector('#date');
const nameCountry = document.querySelector('#name-country');
const confirmed = document.querySelector('.confirmed');
const deaths = document.querySelector('.deaths');
const recovered = document.querySelector('.recovered');
const error = document.querySelector('.error');

async function covid(country) {
    const res = await fetch(`https://api.covid19api.com/summary`);
    const data = await res.json();
    console.log(country);

    date.textContent = new Date(data.Date).toDateString();//display date
    if (res.status === 200) {//successfull fetch

        //for getting the countries in the select option box 
        data.Countries.forEach(item => {
            const option = document.createElement('option');
            option.value = item.Country;
            option.textContent = item.Country;
            countries.appendChild(option)

            //displaying the data
            if (country === item.Country) {
                confirmed.children[1].textContent = item.TotalConfirmed;
                confirmed.children[3].textContent = item.NewConfirmed;

                deaths.children[1].textContent = item.TotalDeaths;
                deaths.children[3].textContent = item.NewDeaths;

                recovered.children[1].textContent = item.TotalRecovered;
                recovered.children[3].textContent = item.NewRecovered;

                nameCountry.textContent = item.Country;
            }
        })
    }
    else {
        error.innerHTML = `<h2>Something went WRONG... Try again later</h2>`;//if api takes time to fetch or error is their
    }
}
covid(search.value);

const btnSearch = document.querySelector('button');//search button works
btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    covid(search.value);
    search.value = '';//empty the search box
})