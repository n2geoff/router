/*! Routes v2.0.0 | MIT | https://github.com/n2geoff/routes */
class Routes {
    constructor(opts = {}) {
        this.routes  = opts.routes || {};
        this._routes = [];
    }

    // build dynamic routes
    build() {
        // https://stackoverflow.com/questions/37737499/simple-javascript-url-routing-regex
        return Object.keys(this.routes)
            .sort((a,b) => b.length - a.length)
            .map((path) => {
                return {
                    path: new RegExp("^" + path.replace(/:[^\s/]+/g, "([\\w-]+)") + "$"),
                    cb: this.routes[path]
                };
            });
    }

    static params(q) {
        // https://stackoverflow.com/questions/8648892/how-to-convert-url-parameters-to-a-javascript-object
        return q
            ? JSON.parse("{\"" + q.replace(/&/g, "\",\"").replace(/=/g, "\":\"") + "\"}", function (key, value) { return key === "" ? value : decodeURIComponent(value);})
            : {};
    }

    add(route, cb) {
        this.routes[route] = cb;
    }

    remove(route) {
        delete this.routes[route];
    }

    clean(link) {
        // remove root
        const cleaned = link.replace("#", "").split("?")[0].trim();

        // get query string
        const qs = Routes.params(link.split("?")[1]);

        // remove trailing slash
        if (cleaned.length > 1 && cleaned.endsWith("/")) {
            return [cleaned.slice(0, -1), qs];
        }

        return [cleaned, qs];
    }

    route(link) {
        // clean route link
        link = this.clean(link || window.location.hash);
        const goto = link[0];
        const qs   = link[1];

        // return early
        if (!goto.startsWith("/")) return;

        // loop through all routes, longest first
        for (let i = 0, l = this._routes.length; i < l; i++) {
            // parse if possible
            const found = goto.match(this._routes[i].path) || false;

            if (found) {
                return this._routes[i].cb(found.slice(1), qs);
            }
        }

        return false;
    }

    start() {
        // build routes object
        this._routes = this.build();

        window.addEventListener("hashchange", (e) => {
            e.preventDefault();
            return this.route();
        });

        // current route
        this.route();
    }
}

export default Routes;
