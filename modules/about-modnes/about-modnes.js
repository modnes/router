/* global HTMLElement */
export default class AboutModnes extends HTMLElement {
  connectedCallback () {
    this.insertAdjacentHTML('afterBegin', `
      <h1>About Modnes</h1>
    `)
  }
}
