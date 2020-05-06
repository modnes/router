/* global HTMLElement, fetch */
import Router from '../modnes/router/router.js'

export default class ModnesRepositories extends HTMLElement {
  async connectedCallback () {
    let response
    let data = []
    const ROUTES = [
      {
        path: '/router/repositories',
        tagName: 'repositories-home',
        modules: ['../../repositories-home/index.js']
      },
      {
        path: '/router/repositories/:name',
        tagName: 'modnes-repository',
        modules: ['../../modnes-repository/index.js'],
        attributes: [
          {
            name: 'repository-name',
            value: '{{ name }}'
          }
        ],
        alwaysUpdate: true
      }
    ]

    try {
      response = await fetch('https://api.github.com/orgs/modnes/repos?type=public')
      data = await response.json()
    } catch (e) {
      console.error(e)
    }

    this.insertAdjacentHTML('afterBegin', `
      <div class="ui grid">
        <div class="twelve wide stretched column">
          <div class="sub-router-wrapper ui basic segment">
          </div>
        </div>
        <div class="four wide column">
          <div class="ui vertical fluid right tabular menu">
            <a class="active item" href="repositories" is="router-anchor">
              Repositories
            </a>
          ${data.map(item => `
            <a class="item" href="repositories/${item.name}" is="router-anchor">
              ${item.name}
            </a>
          `).join('')}
          </div>
        </div>
      </div>
    `)
    this.router = new Router(this.querySelector('.sub-router-wrapper'), ROUTES)
  }
}
