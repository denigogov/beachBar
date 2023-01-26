"use strict";
const popUp = document.querySelector(".popUpWindow");
const overlay = document.querySelector(".overlay");
const price = document.querySelectorAll(".price");
const footer = document.querySelector(".footer");

const currentTemp = document.querySelector(".currentTemp");

// Taking out the value and add new price with 20% discount
const priceTotal = function () {
  price.forEach((arr) => {
    const actPrice = arr.innerHTML.trim().slice(1, 6);
    const discount = (actPrice * 20) / 100;
    const totalPrice = actPrice - discount;

    const priceElem = document.createElement("span");
    priceElem.classList.add("price1");
    priceElem.textContent = String(totalPrice).slice(0, 4);
    arr.insertAdjacentElement("afterend", priceElem);
  });
};

const timeData = new Date();

if (
  (timeData.getHours() >= 10 && timeData.getHours() < 12) ||
  (timeData.getHours() >= 14 && timeData.getHours() < 16)
) {
  setTimeout(function () {
    popUp.style.display = "block";
    overlay.style.display = "block";
    window.scrollTo(0, 0);

    priceTotal();
  }, 10000);

  // Close pop-up Window
  overlay.addEventListener("click", function () {
    popUp.style.display = "none";
    overlay.style.display = "none";
    price.forEach((tag) => tag.classList.add("priceLine"));
  });
}

// Add weater api
const geoApi = async function () {
  try {
    const apiResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=40.1271&lon=23.9658&appid=809a656f44a907dfc3695d5f9ffc88b8&units=metric`
    );

    const data = await apiResponse.json();
    if (!apiResponse.ok) return;

    currentTemp.textContent = `The current Temperature ${Math.round(
      data.main.temp
    )}°C`;

    // add weater icon
    const icon1 = data.weather[0].icon;
    const img = document.createElement("img");
    img.classList.add("weaterImg");
    img.src = `http://openweathermap.org/img/wn/${icon1}@2x.png`;
    img.addEventListener("load", function () {
      currentTemp.append(img);
    });
  } catch (err) {
    popUp.style.display = "block";
    overlay.style.display = "block";
    popUp.textContent = "Something happen please try again";
  }
};

geoApi();

// add footer current year auto
footer.textContent = `Orange Beach Bar ${timeData.getFullYear()}®`;
