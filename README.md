# demoblaze

**Pre requirements:**
Make sure to have git installed already (https://git-scm.com/download)
Make sure to have node and npm installed already (https://nodejs.org/en/download/)

**Getting the source code / project contents:**
Clone this repo
> git clone https://github.com/linuxkidvoid/demoblaze.git

**Install packages:**
Type below commands from the root of the folder
> npm install

> npx cypress install

**Run in cypress GUI:** 
Run command from root of the folder and select either all tests or an individual test to run. Note the npx is pre-bundled with npm, so it should be included with npm, should work right out of the box.

> npx cypress open


**Run in headless mode:**
> npx cypress run


**Some design considerations:**
- Each tests are independent of each other for stability, and tests are parallellation ready.
- Page Objects pattern will make locator and method re-use and makes maintainess easier. Not every element locators are abstracted into page object for the sake of clarity. I didn't want to make the tests harder to read due to layers of abstractions.
- Already registered Username and password information are stored in **cypress.env.json** file and it usually should not be pushed to repo, however, those are for demo site. I'm pushing it to repo just for demo to run out of box without user creating extra works to see the tests run.
- The signup test is using generated username and password on the fly, so that we can run the test as many times as we want without getting into user already registered issue.
- The keystrokes can be to fast for machine to type during username and password typing, and this can sometimes creates instability. I overwrite the type command in support/commands.js to give each keystrokes 100 ms wait time, and it looks better too when looking at the tests run.
- Some of the service layer calls upon button clicks such as login, addtocart may need to wait until routes resolve. cy.intercept and cy.wait are used in places that are in need.
- The add product to cart test has a test tear down step to remove the added product from the cart, so that if the test run again, the same pre-condition for the test is kept.
