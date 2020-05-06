/* global HTMLElement */
export default class RepositoriesHome extends HTMLElement {
  connectedCallback () {
    this.insertAdjacentHTML('afterBegin', `
      <h1>Modnes Repositories</h1>
    `)
  }
}
