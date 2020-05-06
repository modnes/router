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
      <div class="ui list">
        <div class="item">
          <div class="content">
            ${data.license.name}
          </div>
        </div>
        <div class="item">
          <i class="linkify icon"></i>
          <div class="content">
            <a href="${data.homepage}">Home Page</a>
          </div>
        </div>
        <div class="item">
          <i class="github square icon"></i>
          <div class="content">
            <a href="${data.html_url}">Repository</a>
          </div>
        </div>
      </div>
    `)
  }
}
