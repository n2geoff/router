import test from "../node_modules/testit/dist/testit.js";
import Routes from "../src/index.js";

test.it({
    "routes class exists": function () {
        test.assert(Routes);
    }
}).run();

