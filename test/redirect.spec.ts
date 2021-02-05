import {ClientFunction, Selector} from "testcafe";
import sleep from "../src/func_utils"
import {removeTrailingOblique} from "../src/func_utils"

// Utility functions
const getWindowLocation = ClientFunction(() => document.location.href);


fixture `Page Redirection Tests`            // Notice the back-tick, NOT a single or double quote
    .page `../src/practice_page.html`     // notice what heppens when the test is run...  Add semicolon if no optional elements

    test('current location', async t => {
        const location = await getWindowLocation();
        const expectedResult = 'file:///C:/work/testcafe-quicklab-practice/src/practice_page.html';

        console.log( location );

        await t
            .expect(location).eql(expectedResult) // add your assert here...
        // assert that the current location matches the expectedResult

        // the sleep isn't needed but useful for pausing the browser, value is in milliseconds
        await sleep(3000);
    });

    test('navigate away, then back, then away', async t => {
        // arrange...
        // fetch the tags for BBC and QA, store them in the two variable bbc and qa respectively
        const bbc = Selector('#bbc');
        const qa = Selector('#qa');
        const homeLocation = await getWindowLocation();
        console.log(homeLocation);
        // get your current location, store it in a location variable - this is home location

        // set up your expected values for the BBC and QA tags.
        // Use the variables from above and call await bbc.getAttribute("href")
        // Use console.log() or the debugger to see what above code does
        const expectedResultBBC = await bbc.getAttribute("href");
        const expectedResultQA = await qa.getAttribute("href");
        console.log(expectedResultBBC);
        console.log(expectedResultQA);

        // act...
        // navigate to the bbc by clicking on the page
        // get your current location
        await t
            .click(bbc);

        const currentLocation1 = await getWindowLocation();

        // assert...
        // aasert that the current location matches the expected location for the bbc
        await t
            .expect(currentLocation1).contains(expectedResultBBC)

        // arrange...
        // navigate back to the home location using t.navigateTo()
            .navigateTo(homeLocation)
 
        // act...
        // navigate to QA by clicking on the page
        // get your current location
            .click(qa);

        const currentLocation2 = await getWindowLocation();

        const removeOblique = removeTrailingOblique(currentLocation2);
        console.log(removeOblique);


        // assert...
        // aasert that the current location matches the expected location for the QA
        await t
            .expect(removeOblique).eql(expectedResultQA)
    });