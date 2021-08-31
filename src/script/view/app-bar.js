/* eslint-disable require-jsdoc */
class AppBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({mode: "open"});
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.shadowDOM.innerHTML = `
            <style>
                *{
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                .app-bar{
                    text-align: center;
                    margin: 1.5rem 0 1.1rem 0;
                    line-height: 1.5;
                }
                .app-bar > h4{
                    font-weight: 10;
                    opacity: 0.8;
                    font-size: 0.8rem;
                }
            </style>

            <div id="appBar" class="app-bar">
                <h2>Covid - 19 Statistics</h2>
                <h4>Stay Safe, Covid Still Alive</h4>
            </div>
        `;
  }
}

customElements.define("app-bar", AppBar);
