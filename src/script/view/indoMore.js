import {provinceDiv, province} from "./province.js";
import {vaxDiv, recap, target} from "./vaksin.js";

const divIndo = document.createElement("div");
divIndo.setAttribute("class", "indo");
divIndo.style.display = "none";

const indoMore = () => {
  const indoTitle = document.createElement("h2");
  indoTitle.innerText = "Indonesia";
  indoTitle.setAttribute("id", "indo-title");

  const indoCovImg2 = document.createElement("div");
  indoCovImg2.innerHTML = `
        <div class="indocovImg2Div">
            <img id="indocovImg2" src="https://i.ibb.co/7Gm24ts/indocovid.png" alt="Indo Mask">
        </div>
    `;

  const moreIndo = document.createElement("div");
  moreIndo.setAttribute("class", "more-indo");

  divIndo.appendChild(indoTitle);
  divIndo.appendChild(indoCovImg2);
  divIndo.appendChild(moreIndo);

  moreIndo.appendChild(provinceDiv);

  const mainContainer = document.querySelector("main");
  mainContainer.appendChild(divIndo);


  const indoCovImg = document.createElement("img");
  indoCovImg.setAttribute("id", "indocovImg");
  indoCovImg.setAttribute("src", "https://i.ibb.co/7Gm24ts/indocovid.png");
  moreIndo.appendChild(indoCovImg);

  moreIndo.appendChild(vaxDiv);
  province();
  recap();
  target();
};

const toggleIndo = () => {
  if (divIndo.style.display === "none") {
    divIndo.style.display = "block";
  } else {
    divIndo.style.display = "none";
  }
};

export {indoMore, toggleIndo};
