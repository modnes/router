/* global HTMLAnchorElement */

import Router from '../router.js'

export default class RouterAnchor extends HTMLAnchorElement {
  connectedCallback () {
    this.addEventListener('click', this.handleClick.bind(this))
  }

  handleClick (event) {
    const HREF = this.getAttribute('href')

    event.preventDefault()
    Router.goTo(HREF)
  }
}
