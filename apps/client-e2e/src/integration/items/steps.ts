import { Before, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

let numberOfItems = 0;

Before(() => {
  cy.loginByCognitoApi(Cypress.env('cognito_username'), Cypress.env('cognito_password'));
});

Given('home page loaded', () => {
  cy.intercept('GET', 'api/v1/items').as('GetItems');
  cy.visit('/');
  cy.wait('@GetItems');
});

When('add button clicked', () => {
  cy.get(`[data-testid=items-list]`).then((itemList) => {
    if (itemList.children()) {
      numberOfItems = Cypress.$.makeArray(itemList.children()).length;
    }
  });
  cy.get(`[data-testid=add-button]`).click();
});

Then('one more item will be added to the item list', () => {
  cy.get(`[data-testid=items-list]`)
    .children()
    .should('have.length', numberOfItems + 1);
});
