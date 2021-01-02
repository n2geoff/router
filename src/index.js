class Routes {
    // TODO: add default /error
    _routes = {};

    constructor(routes = {}) {
        this._routes = routes;

        this.listen();
    }

    add(path, cb) {
        this._routes[path] = cb;
        return this;
    }

    remove(path) {
        delete this._routes[path];
    }

    route(path, data) {
        try {
            // execute route
            this._routes[path || '/'](data || {});
        } catch (e) {
            // not found
            this._routes['/'](data || { error: `route not found ${path}` });
        }
    }

    list() {
        return this._routes;
    }

    static params(q) {
        // https://stackoverflow.com/questions/8648892/how-to-convert-url-parameters-to-a-javascript-object
        return q
            ? JSON.parse('{"' + q.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
            : {};
    }

    listen() {
        const self = this;

        try {
            // need inital page-load route
            const route = location.hash.slice(1).toLowerCase().split('?') || '/';

            // execute route
            self.route(route[0], route[1]);

            // now listen for route changes
            window.addEventListener('hashchange', function () {
                const route = location.hash.slice(1).toLowerCase().split('?') || '/';

                // execute route
                self.route(route[0], route[1]);
            });
        } catch (e) {
            this.route('/', { error: e.message });
        }

    }
}

export default Routes;
