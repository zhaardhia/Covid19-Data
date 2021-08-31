/* eslint-disable no-unused-vars */
import animateNumber from "./animateNum.js";
import DataSource from "../data/data-source.js";
import delimiter from "./delimiter.js";

const provinceDiv = document.createElement("div");
const province = () => {
  provinceDiv.setAttribute("class", "province");

  const titleProvince = document.createElement("h3");
  titleProvince.innerText = "Select Province :";

  const inputSelect = document.createElement("input");
  inputSelect.setAttribute("list", "province-id");
  inputSelect.setAttribute("type", "text");
  inputSelect.setAttribute("id", "select-province");

  const datalist = document.createElement("datalist");
  datalist.setAttribute("id", "province-id");

  const provinceInfo = document.createElement("div");
  provinceInfo.innerHTML = `
        <div class="province-info">
            <div id="province-case" class="province-more">
                <h3 class="counters">0</h3>
                <h4 class="title-count">Cases</h4>
            </div>
            <div id="province-treated" class="province-more">
                <h3 class="counters">0</h3>
                <h4 class="title-count">Treated</h4>
            </div>
            <div id="province-recover" class="province-more">
                <h3 class="counters">0</h3>
                <h4 class="title-count">Recovered</h4>
            </div>
            <div id="province-death" class="province-more">
                <h3 class="counters">0</h3>
                <h4 class="title-count">Death</h4>
            </div>
        </div>
    `;

  provinceDiv.appendChild(titleProvince);
  provinceDiv.appendChild(inputSelect);
  provinceDiv.appendChild(datalist);
  provinceDiv.appendChild(provinceInfo);

  const dropDownProv = document.querySelector("#province-id");
  const dropDownProvSelect = document.querySelector("#select-province");
  const provCases = document.querySelectorAll("#province-case > h3");
  const provTreated = document.querySelectorAll("#province-treated > h3");
  const provRecovered = document.querySelectorAll("#province-recover > h3");
  const provDeath = document.querySelectorAll("#province-death > h3");
  let optionProv = [];

  const optionClick = (event) => {
    if (event.target.value !== "") {
      provinceClicked(event.target.value);
      dropDownProvSelect.setAttribute("placeholder", event.target.value);
      event.target.value = "";
    }
  };

  const renderProvName = async () => {
    try {
      const dataSourceProv = await DataSource.searchProvinceName();

      renderProvNameAll(dataSourceProv);
    } catch (message) {
      fallbackResultProv(message);
    }
  };
  renderProvName();


  const renderProvNameAll = (results) => {
    const arrProv = [];
    for (let i = 0; i < results.length; i++) {
      arrProv.push(results[i].provinsi);
    }
    arrProv.sort();
    for (let i = 0; i < arrProv.length; i++) {
      optionProv = document.createElement("option");
      optionProv.innerText = arrProv[i];
      optionProv.setAttribute("value", arrProv[i]);
      dropDownProv.appendChild(optionProv);
    }
  };


  const provinceClicked = async (val) => {
    try {
      const dataSourceProv = await DataSource.searchProvince(val);

      renderResultProv(dataSourceProv);
    } catch (message) {
      fallbackResultProv(message);
    }
  };


  const renderResultProv = (results) => {
    const parentDivProv = document.querySelector(".province-info");
    parentDivProv.innerHTML = "";

    results.forEach((cov) => {
      const casesNum = cov.kasus;
      const treatedNum = cov.dirawat;
      const recoveredNum = cov.sembuh;
      const deathNum = cov.meninggal;

      const divCase = document.createElement("div");
      divCase.setAttribute("id", "province-case");
      divCase.setAttribute("class", "province-more");
      divCase.innerHTML = `
                <h3 class="counters"></h3>
                <h4 class="title-count">Cases</h4>
            `;
      parentDivProv.appendChild(divCase);

      const divTreated = document.createElement("div");
      divTreated.setAttribute("id", "province-treated");
      divTreated.setAttribute("class", "province-more");
      divTreated.innerHTML = `
                <h3 class="counters"></h3>
                <h4 class="title-count">Treated</h4>
            `;
      parentDivProv.appendChild(divTreated);

      const divRecover = document.createElement("div");
      divRecover.setAttribute("id", "province-recover");
      divRecover.setAttribute("class", "province-more");
      divRecover.innerHTML = `
                <h3 class="counters"></h3>
                <h4 class="title-count">Recovered</h4>
            `;
      parentDivProv.appendChild(divRecover);

      const divDeath = document.createElement("div");
      divDeath.setAttribute("id", "province-death");
      divDeath.setAttribute("class", "province-more");
      divDeath.innerHTML = `
                <h3 class="counters"></h3>
                <h4 class="title-count">Death</h4>
            `;
      parentDivProv.appendChild(divDeath);

      const provCases = document.querySelectorAll("#province-case > h3");
      const provTreated = document.querySelectorAll("#province-treated > h3");
      const provRecovered = document.querySelectorAll("#province-recover > h3");
      const provDeath = document.querySelectorAll("#province-death > h3");

      animateNumber(provCases, delimiter(casesNum));
      animateNumber(provTreated, delimiter(treatedNum));
      animateNumber(provRecovered, delimiter(recoveredNum));
      animateNumber(provDeath, delimiter(deathNum));
    });
  };

  const fallbackResultProv = (message) => {
    provCases.innerText = message;
    provTreated.innerText = message;
    provRecovered.innerText = message;
    provDeath.innerText = message;
  };


  dropDownProvSelect.addEventListener("change", optionClick);
};

export {provinceDiv, province};
