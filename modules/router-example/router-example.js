/* global HTMLElement */
import Router from '../modnes/router/router.js'

export default class RouterExampĺe extends HTMLElement {
  connectedCallback () {
    const ROUTES = [
      {
        path: '/router/',
        tagName: 'about-modnes',
        modules: ['../../about-modnes/index.js']
      },
      {
        path: '/router/repositories*',
        tagName: 'modnes-repositories',
        modules: ['../../modnes-repositories/index.js']
      }
    ]

    this.insertAdjacentHTML('afterBegin', `
      <div class="router-example-menu ui pointing menu">
        <a class="active item" href="./" is="router-anchor">
          About modnes
        </a>
        <a class="item" href="repositories" is="router-anchor">
          Repositories
        </a>
      </div>
      
      <section class="router-wrapper ui basic segment">
      </section>
    `)
    this.router = new Router(this.querySelector('.router-wrapper'), ROUTES)
    this.querySelectorAll('.router-example-menu > .item').forEach(item => {
      item.addEventListener('click', () => {
        this.querySelectorAll('.router-example-menu > .item').forEach(item => {
          item.classList.remove('active')
        })
        item.classList.add('active')
      })
    })
  }
}
