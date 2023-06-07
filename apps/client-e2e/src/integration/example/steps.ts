import { Before, Given, Then } from 'cypress-cucumber-preprocessor/steps';

Before(() => {
  cy.loginByCognitoApi(Cypress.env('cognito_username'), Cypress.env('cognito_password'));
});

Given('home page loaded', () => {
  cy.intercept('GET', 'api/v1/items').as('GetItems');
  cy.visit('/');
  cy.wait('@GetItems');
});

Then('should contain text of `Hello World`', () => {
  cy.get(`[data-testid=example]`).should('contain.text', 'Hello World');
});
