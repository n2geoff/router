# Routes

> minimalistic hash-based router

Tiny (~1kb) static-routes no-frills hash-based router for single-page-apps.

> NOTE: Route Links expected as "#/". hashes ("#") work as expected


## API

    Routes([routes = {}]).start();

- `routes` {Object} - preloaded {route:function, ...} routes (optional)

### Methods

- `add` adds a route to the registry
- `remove` deletes a route from the registry
- `route` triggers a route
- `start` initializes the router to watch for changes

### Utility Methods
- `Routes.params(qs)` converts a query string into JSON

## Quick Start

```js
// routes.js

import Routes from 'dist/routes.min.js';

const routes = new Routes({
    routes: {
        "/": console.log("Home Page"),
        "/one": console.log("One"),
        "/two/:id": (vals, qs) => console.log(vals[0], qs),
        "/three/:id/:greet": console.log,
        "/four/?name=geoff": console.log,
    }
}).start();
```

or you can define your routes one at a time via

```js
const routes = new Routes();

routes.add('/', function() {
    console.log('yeah, we hit our route');
});

// call start last
routes.start();

```

## Tests

    npm test

and lint via

    npm run lint

## TODO

- write tests
- params return as an array, would like this to be a key/value object
  that is merged with query string params

## Support

Please open [an issue](https://github.com/n2geoff/routes/issues/new) for support.

## Contributing

Anyone is welcome to contribute, however, if you decide to get involved, please take a moment to review the [guidelines](CONTRIBUTING.md), they're minimalistic;)

## License

[MIT](LICENSE) 2024 Geoff Doty
