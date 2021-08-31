/* eslint-disable prefer-const */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
import DataSource from "../data/data-source.js";
import selected from "./selected.js";
import indoMain from "./indonesiaMain.js";
import animateNumber from "./animateNum.js";
// import {displayLoading, hideLoading} from "./loader.js";

const main = async () => {
  const globalCases = document.querySelectorAll("#cases > h2");
  const globalRecovered = document.querySelectorAll("#recovered > h2");
  const globalDeath = document.querySelectorAll("#death > h2");

  const load = document.querySelector(".loading");

  const global = document.querySelector("#globalData");
  const displayLoading = () => {
    global.style.display = "none";
    setTimeout(() => {
      load.style.display = "none";
    }, 5000);
  };
  displayLoading();

  const hideLoading = () => {
    load.style.display = "none";
    global.style.display = "initial";
  };

  const renderResult = (results) => {
    const casesNumGlobal = results.totalCases.replaceAll(",", ".");
    const recoveredNumGlobal = results.totalRecovered.replaceAll(",", ".");
    const deathNumGlobal = results.totalDeaths.replaceAll(",", ".");

    animateNumber(globalCases, casesNumGlobal);
    animateNumber(globalRecovered, recoveredNumGlobal);
    animateNumber(globalDeath, deathNumGlobal);
    hideLoading();
  };


  const fallbackResult = (message) => {
    globalCases.innerText = message;
    globalRecovered.innerText = message;
    globalDeath.innerText = message;
  };

  try {
    const dataSourceGlobalResult = await DataSource.searchGlobal();
    renderResult(dataSourceGlobalResult);
  } catch (message) {
    fallbackResult(message);
  }
  selected();
  indoMain();
};
export default main;
