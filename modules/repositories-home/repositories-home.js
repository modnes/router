/* global HTMLElement */
export default class RepositoriesHome extends HTMLElement {
  connectedCallback () {
    this.insertAdjacentHTML('afterBegin', `
      <h1>modnes Repositories</h1>
      <p>
        Here you can find a list of modnes repositories and get more
        information about each module.
      </p>
    `)
  }
}
