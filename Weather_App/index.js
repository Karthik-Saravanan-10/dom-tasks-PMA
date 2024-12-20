const dateText = document.querySelector(".date-text");
const inputData = document.querySelector("#inputData");
const windSpeed = document.getElementById("windSpeed");
const humudity = document.getElementById("humudity");
const celcius = document.querySelector(".celcius");
const mainCtn = document.querySelector("#main-content");
const indicator = document.querySelector(".indicator");
const city = document.querySelector(".city");
const form = document.querySelector("form");

async function myfunction(value) {
  const getData = await fetchData(value);
  dateText.innerHTML = dataFormat();
  if (!getData) {
    mainCtn.classList.add("hide");
    indicator.innerHTML = "City Not Found";
  } else {
    mainCtn.classList.contains("hide") ? mainCtn.classList.remove("hide") : "";
    indicator.innerHTML = "";
    celcius.innerHTML = Kelvin(getData[2]);
    city.innerHTML = value.slice(0, 1).toUpperCase() + value.slice(1);
    humudity.innerHTML = `${getData[1]}%`;
    windSpeed.innerHTML = `${getData[0]}km/h`;
  }
  console.log(value);
}

const fetchData = async (value) => {
  const respone = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=029a64ab0f9077f7464d73919fce7d6a`
  );
  if (respone?.ok) {
    const data = await respone.json();
    return [data?.wind?.speed, data?.main?.humidity, data?.main?.temp];
  } else {
    return false;
  }
};

const Kelvin = (data) => {
  return `${Math.round(data - 273.15)}<sup>o</sup>c`;
};

const dataFormat = () => {
  const date = new Date();
  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${date.getHours()}:${date.getMinutes()} - ${
    day[date.getDay()]
  }, ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  myfunction(inputData.value);
});
