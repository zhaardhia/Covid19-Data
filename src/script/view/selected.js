/* eslint-disable no-empty */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import DataSource from "../data/data-source.js";
import animateNumber from "./animateNum.js";
import {Chart, registerables} from "chart.js";
import delimiter from "./delimiter.js";
Chart.register(...registerables);
let myChartSelected;

const selected = () => {
  let dataDonutselect = [0, 0, 0];

  const dropDown = document.querySelector("#selected-id");
  const dropDownSelect = document.querySelector("#selected");


  const selectCases = document.querySelectorAll("#select-case > h3");
  const selectRecovered = document.querySelectorAll("#select-recover > h3");
  const selectDeath = document.querySelectorAll("#select-death > h3");

  let option = [];
  const optionClick = (event) => {
    if (event.target.value !== "") {
      console.log(event.target.value);
      countryClicked(event.target.value);
      dropDownSelect.setAttribute("placeholder", event.target.value);
      event.target.value = "";
    }
  };
  const renderCountryName = async () => {
    try {
      const dataSourceCountry = await DataSource.searchCountryName();
      renderCountryNameAll(dataSourceCountry);
    } catch (message) {
      fallbackResultSelect(message);
    }
  };
  renderCountryName();

  const renderCountryNameAll = (results) => {
    const arrRes = [];
    for (let i = 0; i < results.length; i++) {
      arrRes.push(results[i].name);
    }
    arrRes.sort();
    for (let i = 0; i < arrRes.length; i++) {
      option = document.createElement("option");
      option.innerText = arrRes[i];
      option.setAttribute("value", arrRes[i]);
      dropDown.appendChild(option);
    }
  };

  const countryClicked = async (val) => {
    try {
      const dataSourceSelectResult = await DataSource.searchCountry(val);
      renderResultSelect(dataSourceSelectResult);
    } catch (message) {
      fallbackResultSelect(message);
    }
  };

  const renderResultSelect = (results) => {
    const parentDiv = document.querySelector(".select-info");
    parentDiv.innerHTML = "";

    const casesNum = +results.totalCases.replaceAll(",", "");
    const recoveredNum = +results.totalRecovered.replaceAll(",", "");
    const deathNum = +results.totalDeaths.replace(",", "");

    dataDonutselect = [deathNum, recoveredNum, casesNum];

    const divCase = document.createElement("div");
    divCase.setAttribute("id", "select-case");

    divCase.innerHTML = `
            <h3 class="counters"></h3>
            <h4 class="title-count">Cases</h4>
        `;
    parentDiv.appendChild(divCase);

    const divRecover = document.createElement("div");
    divRecover.setAttribute("id", "select-recover");

    divRecover.innerHTML = `
            <h3 class="counters"></h3>
            <h4 class="title-count">Recovered</h4>
        `;
    parentDiv.appendChild(divRecover);

    const divDeath = document.createElement("div");
    divDeath.setAttribute("id", "select-death");

    divDeath.innerHTML = `
            <h3 class="counters"></h3>
            <h4 class="title-count">Death</h4>
        `;
    parentDiv.appendChild(divDeath);

    const selectCases = document.querySelectorAll("#select-case > h3");
    const selectRecovered = document.querySelectorAll("#select-recover > h3");
    const selectDeath = document.querySelectorAll("#select-death > h3");

    animateNumber(selectCases, delimiter(casesNum));
    animateNumber(selectRecovered, delimiter(recoveredNum));
    animateNumber(selectDeath, delimiter(deathNum));


    const ctx = document.getElementById("myChartSelected").getContext("2d");
    if (myChartSelected) {
      myChartSelected.destroy();
    }

    myChartSelected = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Death", "Recovered", "Cases"],
        datasets: [{
          label: "# of Votes",
          data: dataDonutselect,
          backgroundColor: [
            "rgba(255, 0, 0, 0.48)",
            "rgba(0, 162, 255, 0.4)",
            "rgba(255, 135, 0, 0.62)",
            // "rgba(255, 99, 132, 0.2)",
            // "rgba(54, 162, 235, 0.2)",
            // "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        }],
      },
      options: {
        animation: {
          animateScale: true,
        },
      },
    });
  };

  const fallbackResultSelect = (message) => {
    selectCases.innerText = message;
    selectRecovered.innerText = message;
    selectDeath.innerText = message;
  };
  dropDownSelect.addEventListener("change", optionClick);
};

export default selected;
