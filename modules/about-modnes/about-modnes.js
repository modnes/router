/* global HTMLElement */
export default class AboutModnes extends HTMLElement {
  connectedCallback () {
    this.insertAdjacentHTML('afterBegin', `
      <h1>About modnes</h1>
      <p>
        modnes is a set of MODular Native EcmaScripts created to help
        developers build web applications based in web standards in a flexible
        and simple way.
      </p>
    `)
  }
}
