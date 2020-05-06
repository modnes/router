/* global history, CustomEvent */

/**
 * modnes Router
 * @module '@modnes/router'
 * @author Luiz Henrique Canet Filho <me@luizca.net>
 */

/**
 * The built in custom event object.
 * @external CustomEvent
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent|CustomEvent}
 */

/**
 * Router
 */
export default class Router {
  /**
   * Creates a Router
   * @param  {HTMLElement}  wrapper A DOM HTML element
   * @param  {object[]}     routes  The routes set
   */
  constructor (wrapper, routes) {
    this.routes = (routes instanceof Array) ? routes : []
    this.wrapper = wrapper
    this.current = null
    this.path = null
    this.currentElement = null

    window.addEventListener('pathChanged', this.updateRoute.bind(this))
    window.addEventListener('popstate', this.updateRoute.bind(this))
    this.updateRoute()
  }

  /**
   * Add a new route to the router
   * @param {object} route A route object
   */
  addRoute (route) {
    this.routes.push(route)
  }

  async updateRoute () {
    const ROUTE = this.getRoute(location.pathname)

    if (ROUTE !== null && (this.current === null || this.current.path !== ROUTE.path || ROUTE.alwaysUpdate)) {
      if (ROUTE.modules instanceof Array) {
        for (const MODULE of ROUTE.modules) {
          await import(MODULE)
        }
      }

      this.current = ROUTE
      this.updateElement(ROUTE.tagName)
    }
  }

  updateElement (tagName) {
    const ELEMENT = document.createElement(this.mixParams(tagName))

    if (this.currentElement) {
      this.currentElement.remove()
    }

    if (Array.isArray(this.current.classes)) {
      for (const CLASS_ITEM of this.current.classes) {
        ELEMENT.classList.add(this.mixParams(CLASS_ITEM))
      }
    }

    if (Array.isArray(this.current.attributes)) {
      for (const ATTIRBUTE of this.current.attributes) {
        ELEMENT.setAttribute(this.mixParams(ATTIRBUTE.name), this.mixParams(ATTIRBUTE.value))
      }
    }

    this.wrapper.appendChild(ELEMENT)
    this.currentElement = ELEMENT
  }

  getRoute (path) {
    for (const INDEX in this.routes) {
      const REGEX = Router.createRegExp(this.routes[INDEX].path)

      if (REGEX.test(path)) {
        return this.routes[INDEX]
      }
    }

    return null
  }

  /**
   * Get parameters from URI
   * @return {object} An object with URI parameters as properties
   */
  getParams () {
    const PARAMS = {}
    const PATH_PARAMS = this.current.path.match(/:+[^/$]*/g)
    const PATH_PARTS = window.location.pathname.split('/')
    const ROUTE_PARTS = this.current.path.split('/')

    ROUTE_PARTS.forEach((part, index) => {
      if (PATH_PARAMS && PATH_PARAMS.indexOf(part) !== -1) {
        PARAMS[part.replace(':', '')] = PATH_PARTS[index]
      }
    })

    return PARAMS
  }

  mixParams (string) {
    let mixedString = string
    const PARAMS = this.getParams()

    for (const PARAM in PARAMS) {
      mixedString = mixedString.replace(new RegExp(`{{\\s*${PARAM}\\s*}}`, 'g'), PARAMS[PARAM])
    }

    return mixedString
  }

  static createRegExp (path) {
    let regex = `^${path}$`

    regex = regex.replace(/\*/g, '.*')
    regex = regex.replace(/:+[^/$]*/g, '[^/]*')

    return new RegExp(regex)
  }

  /**
   * Navigate to a new path
   * @param  {string} path The new path
   */
  static goTo (path) {
    let base

    try {
      base = document.querySelector('base').getAttribute('href')
    } catch (e) {
      base = '/'
    }

    if (path[0] === '/') {
      path = path.substr(1)
    }

    path = base + path
    history.pushState(path, '', path)
    window.dispatchEvent(new CustomEvent('pathChanged'))
  }
}
