# Routes

> minimalistic hash-based router

Tiny (>1kb) static-routes no-frills hash-based router for single-page-apps.

query data is passed to the callback function as JSON


## API

    Routes([routes = {}])

- `routes` {Object} - preloaded {route:function, ...} routes (optional)

### Methods

- `add` adds a route to the registry
- `remove` deletes a route from the registry
- `list` returns an object of registered routes
- `route` triggers a route
- `params` converts a querystring into JSON


## Quick Start


```js
// routes.js

import Routes from 'routes';

const routes = new Routes();

routes.add('/', function() {
    console.log('yeah, we hit our route');
});

```

> TODO: add more documentation


## Tests

    npm test

> NOTE: requires `deno` to execute module-based client-side test runner

and lint via

    npm run lint

## Support

Please open [an issue](https://github.com/n2geoff/routes/issues/new) for support.

## Contributing

Anyone is welcome to contribute, however, if you decide to get involved, please take a moment to review the [guidelines](CONTRIBUTING.md), they're minimalistic;)

## License

[MIT](LICENSE) 2021 Geoff Doty