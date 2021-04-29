class SignUpModal {
  constructor() {
    this.signUpLink = '#signin2'
    this.username = '#sign-username'
    this.password = '#sign-password'
    this.signUpBtn = '#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary'
  }

  signup(username, password) {
    cy.intercept('/signup').as('signup')
    cy.get(this.signUpLink).click()
    cy.get(this.username).clear().type(username)
    cy.get(this.password).clear().type(password)
    cy.get(this.signUpBtn).click()
    cy.wait('@signup')
  }
}

class LogInModal {
  constructor() {
    this.logInLink = '#login2'
    this.username = '#loginusername'
    this.password = '#loginpassword'
    this.signInBtn = '#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary'
  }

  signin(username, password) {
    cy.intercept('/login').as('login')
    cy.get(this.logInLink).click()
    cy.get(this.username).clear().type(username)
    cy.get(this.password).clear().type(password)
    cy.get(this.signInBtn).click()
    cy.wait('@login')
  }
}

export {SignUpModal, LogInModal}