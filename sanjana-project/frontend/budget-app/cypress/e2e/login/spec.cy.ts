describe('Personal Budgeting App', () => {
  before(() => {
    cy.eyesOpen({
      appName: 'Personal Budgeting App',
      testName: 'Full App Testing',
      batchName: 'Personal Budgeting App Test Batch',
      apiKey: 'Epwm3p103Nefx63sGMeSql0NjmoVpCIV6SLFJro0fU1071g110'
    });
  });

  it('should handle the login process correctly', () => {
    cy.visit('/login');
    cy.get('input#inputEmail').type('test@example.com');
    cy.get('input#inputPassword').type('password');
    cy.get('form').submit();
    cy.url().should('include', '/dashboard');
    cy.eyesCheckWindow('Login Page');
  });

  it('should handle the registration process correctly', () => {
    cy.visit('/register');
    cy.get('input#inputName').type('sanjay');
    cy.get('input#inputEmail').type('sanjay@example.com');
    cy.get('input#inputPassword').type('password123');
    cy.get('form').submit();
    cy.url().should('include', '/login');
    cy.eyesCheckWindow('Register Page');
  });

  it('checks the navigation bar functionality', () => {
    cy.visit('/dashboard');
    cy.eyesCheckWindow('Navbar');
  });

  it('checks the home component visibility', () => {
    cy.visit('/dashboard');
    cy.eyesCheckWindow('Home Component');
  });

  it('checks the budget management functionality', () => {
    cy.visit('/budget');
    cy.eyesCheckWindow('Budget List');
  });

  it('checks the expenses management functionality', () => {
    cy.visit('/expenses');
    cy.eyesCheckWindow('Expense List');
  });

  afterEach(() => {
    cy.eyesClose();
  });
});
