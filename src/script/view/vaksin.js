/* eslint-disable no-unused-vars */
import DataSource from "../data/data-source.js";
import animateNumber from "./animateNum.js";
import delimiter from "./delimiter.js";

const vaxDiv = document.createElement("div");
vaxDiv.setAttribute("class", "vaccinate");
const vaxTitle = document.createElement("h3");
vaxTitle.innerText = "Vaccinate Data :";
vaxDiv.appendChild(vaxTitle);


const recap = async () => {
  const vaxRecap = document.createElement("div");
  vaxRecap.setAttribute("class", "vax-recap");
  vaxDiv.appendChild(vaxRecap);

  const vaxRecapTitle = document.createElement("h4");
  vaxRecapTitle.innerText = "Vaccinate Recap";
  vaxRecap.appendChild(vaxRecapTitle);
  const vaxRecapInfo = document.createElement("div");
  vaxRecapInfo.setAttribute("class", "vax-recap-info vax-more");

  vaxRecapInfo.innerHTML = `
        <div class="vax-1stdose">
            <h3 class="counters">0</h3>
            <h4 class="title-count">1st Dose</h4>
        </div>
        <div class="vax-2nddose">
            <h3 class="counters">0</h3>
            <h4 class="title-count">2nd Dose</h4>
        </div>
    `;
  vaxRecap.appendChild(vaxRecapInfo);

  const renderResultRecap = (results) => {
    const provVax1 = document.querySelectorAll(".vax-1stdose > h3");
    const provVax2 = document.querySelectorAll(".vax-2nddose > h3");

    animateNumber(provVax1, delimiter(results.vaksinasi1));
    animateNumber(provVax2, delimiter(results.vaksinasi2));
  };

  const firstDose = document.querySelectorAll(".vax-1stdose > h3");
  const secondDose = document.querySelectorAll(".vax-2nddose > h3");
  const fallbackResultRecap = (message) => {
    firstDose.innerText = message;
    secondDose.innerText = message;
  };

  try {
    const dataSource = await DataSource.searchVax();
    renderResultRecap(dataSource);
  } catch (message) {
    fallbackResultRecap(message);
  }
};


const target = async () => {
  const vaxTarget = document.createElement("div");
  vaxTarget.setAttribute("class", "vax-target");
  vaxDiv.appendChild(vaxTarget);

  const vaxTargetTitle = document.createElement("h4");
  vaxTargetTitle.innerText = "Vaccinate Target";
  vaxTarget.appendChild(vaxTargetTitle);

  const vaxTargetInfo = document.createElement("div");
  vaxTargetInfo.setAttribute("class", "vax-target-info vax-more");

  vaxTargetInfo.innerHTML = `
        <div class="vax-target-more all">
            <h3 class="counters">0</h3>
            <h4 class="title-count">All Citizen</h4>
        </div>
        <div class="vax-target-more elderly">
            <h3 class="counters">0</h3>
            <h4 class="title-count">Elderly</h4>
        </div>
        <div class="vax-target-more medic">
            <h3 class="counters">0</h3>
            <h4 class="title-count">Medical Workers</h4>
        </div>
        <div class="vax-target-more pub">
            <h3 class="counters">0</h3>
            <h4 class="title-count">Public Workers</h4>
        </div>
    `;
  vaxTarget.appendChild(vaxTargetInfo);

  const renderResultTarget = (results) => {
    const allCitizen = document.querySelectorAll(".all > h3");
    const elder = document.querySelectorAll(".elderly > h3");
    const med = document.querySelectorAll(".medic > h3");
    const publicWorker = document.querySelectorAll(".pub > h3");

    animateNumber(allCitizen, delimiter(results.totalsasaran));
    animateNumber(elder, delimiter(results.sasaranvaksinlansia));
    animateNumber(med, delimiter(results.sasaranvaksinsdmk));
    animateNumber(publicWorker, delimiter(results.sasaranvaksinpetugaspublik));
  };

  const allCitizen = document.querySelectorAll(".all > h3");
  const elder = document.querySelectorAll(".elderly > h3");
  const med = document.querySelectorAll(".medic > h3");
  const publicWorker = document.querySelectorAll(".pub > h3");

  const fallbackResultTarget = (message) => {
    allCitizen.innerText = message;
    elder.innerText = message;
    med.innerText = message;
    publicWorker.innerText = message;
  };

  try {
    const dataSource = await DataSource.searchVax();

    renderResultTarget(dataSource);
  } catch (message) {
    fallbackResultTarget(message);
  }
};

export {vaxDiv, recap, target};
