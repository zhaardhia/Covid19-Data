/* eslint-disable no-empty */
/* eslint-disable prefer-const */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
import DataSource from "../data/data-source.js";
import {indoMore, toggleIndo} from "./indoMore.js";
import animateNumber from "./animateNum.js";
import {Chart, registerables} from "chart.js";
import delimiter from "./delimiter.js";
import smoothScroll from "./scroll.js";
Chart.register(...registerables);

const indoMain = async () =>{
  let dataDonutIndo = [];

  const loader = document.querySelector("#loadIndo");
  const btnMore = document.querySelector("#btnIndo");

  const displayLoading = () => {
    setTimeout(() => {
      loader.style.display = "none";
    }, 5000);
  };
  displayLoading();

  const hideLoading = () => {
    loader.style.display = "none";
    btnMore.style.display = "initial";
  };
  const renderResultIndo = (results) => {
    const parentDiv = document.querySelector(".indo-info");
    parentDiv.innerHTML = "";

    const casesNum = +results.totalCases.replaceAll(",", "");
    const recoveredNum = +results.totalRecovered.replaceAll(",", "");
    const deathNum = +results.totalDeaths.replaceAll(",", "");

    dataDonutIndo = [deathNum, recoveredNum, casesNum];

    const divCase = document.createElement("div");
    divCase.setAttribute("id", "indo-case");

    divCase.innerHTML = `
            <h3 class="counters"></h3>
            <h4 class="title-count">Cases</h4>
        `;
    parentDiv.appendChild(divCase);

    const divRecover = document.createElement("div");
    divRecover.setAttribute("id", "indo-recover");

    divRecover.innerHTML = `
            <h3 class="counters"></h3>
            <h4 class="title-count">Recovered</h4>
        `;
    parentDiv.appendChild(divRecover);

    const divDeath = document.createElement("div");
    divDeath.setAttribute("id", "indo-death");

    divDeath.innerHTML = `
            <h3 class="counters"></h3>
            <h4 class="title-count">Death</h4>
        `;
    parentDiv.appendChild(divDeath);

    const indoCases = document.querySelectorAll("#indo-case > h3");
    const indoRecovered = document.querySelectorAll("#indo-recover > h3");
    const indoDeath = document.querySelectorAll("#indo-death > h3");
    animateNumber(indoCases, delimiter(casesNum));
    animateNumber(indoRecovered, delimiter(recoveredNum));
    animateNumber(indoDeath, delimiter(deathNum));
    hideLoading();
  };
  const indoCases = document.querySelectorAll("#indo-case > h3");
  const indoRecovered = document.querySelectorAll("#indo-recover > h3");
  const indoDeath = document.querySelectorAll("#indo-death > h3");

  const fallbackResultIndo = (message) => {
    indoCases.innerText = message;
    indoRecovered.innerText = message;
    indoDeath.innerText = message;
  };

  try {
    const dataSourceIndoResult = await DataSource.searchCountry("Indonesia");
    renderResultIndo(dataSourceIndoResult);
  } catch (message) {
    fallbackResultIndo(message);
  }

  indoMore();
  let toggleCond = false;
  let axis;
  document.querySelector("#btnIndo").addEventListener("click", function() {
    if (!toggleCond) {
      axis = 210;
      toggleCond = true;
    } else {
      let width = window.outerWidth;
      if (width > 600) {
        axis = -1;
      } else {
        axis = -900;
      }
      toggleCond = false;
    }
    toggleIndo();
    setTimeout(() => {
      smoothScroll(".indo", 1000, axis);
    }, 200);
  });

  const ctx2 = document.getElementById("myChartIndo").getContext("2d");
  const myChartIndo = new Chart(ctx2, {
    type: "pie",
    data: {
      labels: ["Death", "Recovered", "Cases"],
      datasets: [{
        label: "# of Votes",
        data: dataDonutIndo,
        backgroundColor: [
          "rgba(255, 0, 0, 0.48)",
          "rgba(0, 162, 255, 0.4)",
          // "rgba(255, 135, 0, 0.5)",
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
export default indoMain;
