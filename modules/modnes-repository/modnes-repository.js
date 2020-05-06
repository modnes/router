/* global HTMLElement, fetch */
export default class ModnesRepository extends HTMLElement {
  async connectedCallback () {
    let response
    let data = []

    try {
      response = await fetch(`https://api.github.com/repos/modnes/${this.getAttribute('repository-name')}`)
      data = await response.json()
    } catch (e) {
      console.error(e)
    }

    this.insertAdjacentHTML('afterBegin', `
      <h1>${data.name}</h1>
      <p>${data.description}</p>
    `)
  }
}
