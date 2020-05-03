Router Module
======================

Router is a browser module that aims to let implementations change elements inside a wrapper element in response to path change events.


Installing
----------

    npm i @modnes/router


Usage
-----

The Router must receive an HTML Element from DOM and optionally an Array of route objects.


```javascript
import Router from "path/to/@modnes/router/router.js"

let router = new Router(document.querySelector('main'), [
  {
    path: '/posts',      // will use this settings when accessing /posts
    tagName: 'post-list' // will put <post-list></post-list> inside <main></main>
  },
  {
    path: '/posts/:id',      // will provide the parameter 'id' with value 3 at /posts/3
    tagName: 'post-article',
    attributes: [
      { // will change main element content to <post-article post-id="3"></post-article>
        name: 'post-id',
        value: '{{ id }}'
      }
    ]
  },
  { // will change main element content to <category-list class="categories list"></category-list>
    path: '/categories',
    tagName: 'category-list',
    classes: ['categories', 'list']
  },
  { // will change main element content to <movies-list class="movies-category list"></movies-list>
    path: '/categories/:name', // will provide the parameter 'name' with value 'movies' at /categories/movies
    tagName: '{{ name }}-list',
    classes: ['{{ name }}-category', 'list']
  },
  { path: '/*', tagName: 'home-page' }
])
```

Methods
-------

### addRoute

The [`addRoute()`](https://github.com/modnes/router/wiki/API#addRoute) method can be used inside a proccess to dynamically add new routes to the Router.

```javascript
router.addRoute({
  path: '/section/:param1/:param2/*',
  tagName: 'section-list'
})
```

### getParams

The [`getParams()`](https://github.com/modnes/router/wiki/API#getParams) returns an object with URI parameters as properties.

```javascript
// When location is /section/book/50/any-string
// and route path is /section/:param1/:param2/*
let params = router.getParams()
// params will be equal { param1: 'book', param2: '50' }
```

### Router.goTo

[`Router.goTo()`](https://github.com/modnes/router/wiki/API#goto) is a static method that can be used to navigate to a new path.

```javascript
Router.goTo('/categories') // will change location path to /categories
```

Router Anchor
-------------

The Router package also provides a custom element module to extend the native `a` HTML tag. It implements the Router.goTo() static method.

```html
<html>
  <head>
    <title>Router Anchor</title>
    <script href="path/to/@modnes/router/anchor/index.js" type="module"></script>
  </head>
  <body>
    <a href="/categories" is="router-anchor">Go To Categories</a>
  </body>
</html>
```

See the [API documentation](https://github.com/modnes/router/wiki/API)
