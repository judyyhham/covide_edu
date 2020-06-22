'use strict'
const country_name_element = document.querySelector(".country .name");
const total_cases_element = document.querySelector(".total-cases .value");
const new_cases_element = document.querySelector(".total-cases .new-value");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value");

//const ctx = document.getElementById("axes_line_chart").getContext("2d");

// APP VARIABLES
let app_data = [],
	cases_list = [],
	recovered_list = [],
	deaths_list = [],
	dates = [],
	formatedDates = [];

// GET USERS COUNTRY CODE
let country_code = geoplugin_countryCode();
let user_country;
country_list.forEach( country => {
	if( country.code == country_code ){
        user_country = country.name;
        console.log(user_country)
	}
});

/* ---------------------------------------------- */
/*                API URL AND KEY                 */
/* ---------------------------------------------- */

function fetchData(user_country){
	country_name_element.innerHTML = "Loading...";

    cases_list = [], recovered_list =[], deaths_list = [], dates = [], formatedDates = [];
    
    //
	fetch(`https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=${user_country}`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
		"x-rapidapi-key": "0b25f2ca5fmsh06447be7ec66324p1edfaejsn183977b64fd9"
		}
	})
	.then( response => {
		return response.json();
	})
	//.then( data => {
	//	dates = Object.keys(data);
	//	dates.forEach( date => {
	//		let DATA = data[date];

	//		formatedDates.push(formatDate(date));
	//		app_data.push(DATA);
	//		cases_list.push(parseInt(DATA.total_cases.replace(/,/gi, "")));
	//		recovered_list.push(parseInt(DATA.total_recovered.replace(/,/gi, "")));
	//		deaths_list.push(parseInt(DATA.total_deaths.replace(/,/gi, "")));
		//})
    //})
    .then(data => {
        let dat = data.latest_stat_by_country
        console.log(data.latest_stat_by_country)
        let tot = dat[0].total_cases 
        let date = dat[0].date
        let DATA = dat[0].record_date_pure;
        //formatedDates.push(formatDate(DATA));
        app_data.push(dat[0]);
            cases_list.push(parseInt(tot.replace(/,/g, "")));
            recovered_list.push(parseInt(dat[0].total_recovered.replace(/,/g, "")));
            deaths_list.push(parseInt(dat[0].total_deaths.replace(/,/g, "")));
            })
	.then( () => {
		updateUI();
	})
	.catch( error => {
		console.log(error);
	})
}

fetchData(user_country);

// UPDATE UI FUNCTION
function updateUI(){
	updateStats();
	//axesLinearChart();
}

function updateStats(){
    
    let last_entry = app_data[app_data.length-1];
    console.log(last_entry)
	let before_last_entry = app_data[app_data.length - 2];

	country_name_element.innerHTML = last_entry.country_name;

	total_cases_element.innerHTML = last_entry.total_cases || 0;
	//new_cases_element.innerHTML = `+${last_entry.new_cases || 0 }`;

	recovered_element.innerHTML = last_entry.total_recovered || 0;
	
    //let y = last_entry.total_recovered;
    //let x = before_last_entry.total_recovered;

	deaths_element.innerHTML = last_entry.total_deaths;
    //new_deaths_element.innerHTML = `+${last_entry.new_deaths || 0}`;
    //new_recovered_element.innerHTML = y +'-'+x

    //`+${parseInt(last_entry.total_recovered.replace(/,/g, "")) - parseInt(before_last_entry.total_recovered.replace(/,/g, ""))}`;
}

// UPDATE CHART


// FORMAT DATES
const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(dateString){
	let date = new Date(dateString);

    return `${date.getDate()} ${monthsNames[date.getMonth()]}`;
}