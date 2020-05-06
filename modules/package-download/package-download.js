/* global HTMLElement, fetch */
export default class PackageDownload extends HTMLElement {
  async connectedCallback () {
    let response
    let data

    try {
      response = await fetch(`https://api.github.com/repos/${this.getAttribute('owner') || ''}/${this.getAttribute('repository')}/releases/latest`)
      data = await response.json()
    } catch (e) {
      console.error(e)
    }

    this.insertAdjacentHTML('afterBegin', `
      <a href="https://github.com/${this.getAttribute('owner') || ''}/${this.getAttribute('repository')}/archive/${data.tag_name}.zip">
        ${this.getAttribute('repository')}-${data.tag_name}.zip
      </a> |
      <a href="https://github.com/${this.getAttribute('owner') || ''}/${this.getAttribute('repository')}/archive/${data.tag_name}.tar.gz">
        ${this.getAttribute('repository')}-${data.tag_name}.tar.gz
      </a>
    `)
  }
}
