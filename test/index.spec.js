import test from "../node_modules/testit.run/dist/testit.min.js";
import Routes from "../src/index.js";

test.it({
    "routes class exists": function () {
        test.assert(Routes);
    }
}).run();
