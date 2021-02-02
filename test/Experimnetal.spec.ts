import { expect } from "chai";
import {ClientFunction, Selector} from "testcafe";
import sleep from "../src/func_utils"
import {ReactSelector, waitForReact } from "testcafe-react-selectors";

const getWindowLocation = ClientFunction(() => document.location.href);


fixture `Populate Your Name window with Peter Parker`   
    .page(`https://devexpress.github.io/testcafe/example/`)

    test('Populate Window', async t => {
        const populate = Selector('#populate');
        const name = Selector('#developer-name');

        await t
            .setNativeDialogHandler(() => true)
            .click(populate)
            .expect(name.value).eql('Peter Parker', "Peter parker not displayed")

        // the sleep isn't needed but useful for pausing the browser, value is in milliseconds
        await sleep(3000);
    });