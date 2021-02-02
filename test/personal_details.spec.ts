import {Selector} from "testcafe";
import sleep from "../src/func_utils"


fixture `Personal Details Tests`            // Notice the back-tick, NOT a single or double quote
    .page `../src/practice_page.html`     // notice what heppens when the test is run...  Add semicolon if no optional elements

    test('test username', async t => {
        const username = Selector('#username');

        await t     // We wait on a Promise
            .typeText(username, 'species8472')
            .expect(username.value).contains('species8472', 'input contains the text "species8472"')
        //await sleep(3000);
    })  
        test('test each word of first name is capitalised', async t => {
         const firstname = Selector('#firstname');
    
            await t     // We wait on a Promise
                .typeText(firstname, 'species8472')
                .click('#username')
                .expect(firstname.value).contains('Species8472', 'firstname capitalised to "Species8472"')
            //await sleep(3000);
    })
    test('test each word of last name is capitalised', async t => {
        const lastname = Selector('#lastname');
   
           await t     // We wait on a Promise
               .typeText(lastname, 'species8472')
               .click('#username')
               .expect(lastname.value).contains('Species8472', 'lastname capitalised to "Species8472"')
           //await sleep(3000);
   })
    test('test age label is blank on page launch', async t => {
        const age = Selector('#age');

        await t     // We wait on a Promise
             .expect(age.innerText).eql("", 'Initially no age displayed')
        //await sleep(3000);
    })
        test('verify outputted age is correct', async t => {
            const age = Selector('#age');
            const ageInput = Selector('input[type=date]');

            await t     // We wait on a Promise
                .click("#birthday")
                .typeText(ageInput, '1993-01-08')
                .expect(age.innerText).eql("28", 'Correct age not displayed');
            await sleep(3000);
    });