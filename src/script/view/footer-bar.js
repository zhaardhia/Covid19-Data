/* eslint-disable require-jsdoc */
class FooterBar extends HTMLElement {
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
                
                :host{
                    text-align: center;
                    margin: 1rem 0 1rem 0;
                    line-height: 1;
                }
                
                h3{
                    font-weight: 300;
                    font-size: 1rem;
                }
                h4{
                    font-weight: 100;
                    font-size: 0.7rem;
                }
                h4 > a{
                    color: white;
                }
            </style>

            <h3>&copy;2021, Zhaardhia</h3>
            <h4>Data API from <a href="https://github.com/shahmirfaisal">shahmirfaisal</a> & <a href="https://github.com/Reynadi531">Reynadi531</a> </h4>
        `;
  }
}
customElements.define("footer-bar", FooterBar);
