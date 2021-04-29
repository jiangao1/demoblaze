import generator from 'generate-password'
import {SignUpModal, LogInModal} from '../page-object/frontPage'

describe('Demo tests for demoblaze product store', () => {
  let signUpModal = new SignUpModal()
  let logInModal = new LogInModal()

  beforeEach(() => {
    cy.visit('/')
  })

  it('should be able to signup and create new account', () => {
    // generate some random username and passwords on the fly
    let username = 'myUser' + Date.now()
    let password = generator.generate({
      length: 10,
      numbers: true
    })

    // Sign up
    signUpModal.signup(username, password)

    // Assert alert box shows up with expected text
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Sign up successful.`)
    })

    // Newly signed up account should be able to log in
    logInModal.signin(username, password)

    // Assert to see the welcome text, indicating the success of account signup, and the signed account can login
    cy.contains(`Welcome ${username}`)
  })

  it('should be able to login using existing account', () => {
    logInModal.signin(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))
    
    // Assert to see the welcome text upon login success
    cy.contains(`Welcome ${Cypress.env('USERNAME')}`)
  })

  describe('add product to cart', () => {
    afterEach(() => {
      // test tear down, remove the item from cart
      cy.contains('Delete').click()
    })

    it('should be able to add a product to cart', () => {
      logInModal.signin(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))
  
      // add product to cart
      // only used once here, if we have more tests, can certain abstract into a helper method too if needed
      let productName = 'Samsung galaxy s6'
      cy.contains(productName).click()
      cy.intercept('/addtocart').as('addtocart')
      cy.contains('Add to cart').click()
      cy.wait('@addtocart')
  
      // go to cart
      cy.get('#cartur').click()
  
      // assert to have the correct type
      cy.contains('.success > :nth-child(2)', productName)
    })
  })

})
