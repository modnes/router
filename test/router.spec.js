/* global describe, it, HTMLElement */
import { expect } from 'chai'
import Router from '../router.js'

require('jsdom-global')(undefined, { url: 'http://localhost/' })

describe('Router', () => {
  describe('Testing the constructor', () => {
    it('Expect to have a new router with empty routes', () => {
      const ROUTER = new Router(document.body)

      expect(ROUTER).to.be.an.instanceof(Router)
      expect(ROUTER.routes).to.have.lengthOf(0)
    })
  })

  describe('Testing the addRoute()', () => {
    it('Expect to be able to add new routes to the router', () => {
      const ROUTER = new Router(document.body)

      ROUTER.addRoute({
        path: '/section',
        tagName: 'section'
      })
      ROUTER.addRoute({
        path: '/article',
        tagName: 'article'
      })

      expect(ROUTER.routes).to.have.lengthOf(2)
    })
  })

  describe('Testing the goTo() static method', () => {
    it('Expect to be in / path with main element present', () => {
      const ROUTER_ELEMENT = document.createElement('div')
      const ROUTER = new Router(ROUTER_ELEMENT, [
        { path: '/', tagName: 'main' }
      ])

      document.body.appendChild(ROUTER_ELEMENT)

      expect(window.location.pathname).to.be.equal('/')
      expect(ROUTER.wrapper.querySelector('main'))
        .to.be.an.instanceof(HTMLElement)
    })

    it('Expect to be in /section/any/article path with article element present', () => {
      const ROUTER_ELEMENT = document.createElement('div')
      const ROUTER = new Router(ROUTER_ELEMENT, [
        { path: '/section/*/article', tagName: 'article', classes: ['section'] },
        { path: '/section/:param1', tagName: 'section' },
        { path: '/section/:param1/:param2', tagName: 'article' },
        { path: '/section/:param1/resource/*', tagName: 'section' },
        { path: '/section', tagName: 'section' },
        { path: '/article', tagName: 'article' },
        { path: '/*', tagName: 'main' }
      ])

      document.body.appendChild(ROUTER_ELEMENT)
      Router.goTo('section/any/article')

      expect(window.location.pathname).to.be.equal('/section/any/article')
      expect(ROUTER.wrapper.querySelector('article'))
        .to.be.an.instanceof(HTMLElement)
      expect(ROUTER.wrapper.querySelector('article').classList.contains('section'))
        .to.be.equal(true)
    })

    it('Expect to be in /section/test1 path with section element present', () => {
      const ROUTER_ELEMENT = document.createElement('div')
      const ROUTER = new Router(ROUTER_ELEMENT, [
        { path: '/section/*/article', tagName: 'article' },
        { path: '/section/:param1', tagName: 'section', attributes: [{ name: 'title', value: 'section' }] },
        { path: '/section/:param1/:param2', tagName: 'article' },
        { path: '/section/:param1/resource/*', tagName: 'section' },
        { path: '/section', tagName: 'section' },
        { path: '/article', tagName: 'article' },
        { path: '/*', tagName: 'main' }
      ])

      document.body.appendChild(ROUTER_ELEMENT)
      Router.goTo('section/test1')

      expect(window.location.pathname).to.be.equal('/section/test1')
      expect(ROUTER.wrapper.querySelector('section'))
        .to.be.an.instanceof(HTMLElement)
      expect(ROUTER.wrapper.querySelector('section').getAttribute('title'))
        .to.be.equal('section')
      expect(ROUTER.getParams()).to.eql({ param1: 'test1' })
    })

    it('Expect to be in /section/test1/test2 path with article element present', () => {
      const ROUTER_ELEMENT = document.createElement('div')
      const ROUTER = new Router(ROUTER_ELEMENT, [
        { path: '/section/*/article', tagName: 'article' },
        { path: '/section/:param1', tagName: 'section' },
        { path: '/section/:param1/:param2', tagName: 'article' },
        { path: '/section/:param1/resource/*', tagName: 'section' },
        { path: '/section', tagName: 'section' },
        { path: '/article', tagName: 'article' },
        { path: '/*', tagName: 'main' }
      ])

      document.body.appendChild(ROUTER_ELEMENT)
      Router.goTo('section/test1/test2')

      expect(window.location.pathname).to.be.equal('/section/test1/test2')
      expect(ROUTER.wrapper.querySelector('article'))
        .to.be.an.instanceof(HTMLElement)
      expect(ROUTER.getParams()).to.eql({
        param1: 'test1',
        param2: 'test2'
      })
    })

    it('Expect to be in /section/test1/resource/any path with section element present', () => {
      const ROUTER_ELEMENT = document.createElement('div')
      const ROUTER = new Router(ROUTER_ELEMENT, [
        { path: '/section/*/article', tagName: 'article' },
        { path: '/section/:param1', tagName: 'section' },
        { path: '/section/:param1/:param2', tagName: 'article' },
        { path: '/section/:param1/resource/*', tagName: 'section' },
        { path: '/section', tagName: 'section' },
        { path: '/article', tagName: 'article' },
        { path: '/*', tagName: 'main' }
      ])

      document.body.appendChild(ROUTER_ELEMENT)
      Router.goTo('section/test1/resource/any')

      expect(window.location.pathname).to.be.equal('/section/test1/resource/any')
      expect(ROUTER.wrapper.querySelector('section'))
        .to.be.an.instanceof(HTMLElement)
      expect(ROUTER.getParams()).to.eql({ param1: 'test1' })
    })

    it('Expect to be in /section path with section element present', () => {
      const ROUTER_ELEMENT = document.createElement('div')
      const ROUTER = new Router(ROUTER_ELEMENT, [
        { path: '/section/*/article', tagName: 'article' },
        { path: '/section/:param1', tagName: 'section' },
        { path: '/section/:param1/:param2', tagName: 'article' },
        { path: '/section/:param1/resource/*', tagName: 'section' },
        { path: '/section', tagName: 'section' },
        { path: '/article', tagName: 'article' },
        { path: '/*', tagName: 'main' }
      ])

      document.body.appendChild(ROUTER_ELEMENT)
      Router.goTo('/section')

      expect(window.location.pathname).to.be.equal('/section')
      expect(ROUTER.wrapper.querySelector('section'))
        .to.be.an.instanceof(HTMLElement)
    })

    it('Expect to be in /any path with main element present', () => {
      const ROUTER_ELEMENT = document.createElement('div')
      const ROUTER = new Router(ROUTER_ELEMENT, [
        { path: '/section/*/article', tagName: 'article' },
        { path: '/section/:param1', tagName: 'section' },
        { path: '/section/:param1/:param2', tagName: 'article' },
        { path: '/section/:param1/resource/*', tagName: 'section' },
        { path: '/section', tagName: 'section' },
        { path: '/article', tagName: 'article' },
        { path: '/*', tagName: 'main' }
      ])

      document.body.appendChild(ROUTER_ELEMENT)
      Router.goTo('any')

      expect(window.location.pathname).to.be.equal('/any')
      expect(ROUTER.wrapper.querySelector('main'))
        .to.be.an.instanceof(HTMLElement)
    })
  })
})
