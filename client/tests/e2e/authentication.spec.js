const faker = require('faker');

module.exports = {
  // SIGN UP
  'Users should not be able to sign up with incorrect email': (browser) => {
    browser
      .url('http://localhost:5000')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', '')
      .setValue('input[name=password]', '')
      .click('#show-signup')
      .waitForElementVisible('#signup-form', 5000)
      .assert.containsText('#signup-text', 'Already have an account?Sign In')
      .setValue('input[name=username]', 'username')
      .setValue('input[name=fullname]', 'fullname')
      .setValue('input[name=email]', 'email')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=confirmPassword]', 'password')
      .click('#signup-button')
      .waitForElementVisible('.error-message', 5000)
      .assert.containsText('.error-message', 'Email is not rightly formatted')
      .pause(1000);
  },
  'Users should not be able to sign up if passwords do not match':
  (browser) => {
    browser
      .url('http://localhost:5000')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', '')
      .setValue('input[name=password]', '')
      .click('#show-signup')
      .waitForElementVisible('#signup-form', 5000)
      .assert.containsText('#signup-text', 'Already have an account?Sign In')
      .pause(1000)
      .setValue('input[name=username]', 'username')
      .setValue('input[name=fullname]', 'fullname')
      .setValue('input[name=email]', 'user@gmail.com')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=confirmPassword]', 'confirmPassword')
      .click('#signup-button')
      .waitForElementVisible('.error-message', 5000)
      .assert.containsText('.error-message', 'Password does not match')
      .pause(1000);
  },
  'Users should be able to sign up successfully with correct details':
  (browser) => {
    browser
      .url('http://localhost:5000')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', '')
      .setValue('input[name=password]', '')
      .click('#show-signup')
      .waitForElementVisible('#signup-form', 5000)
      .assert.containsText('#signup-text', 'Already have an account?Sign In')
      .pause(1000)
      .setValue('input[name=username]', faker.internet.userName())
      .setValue('input[name=fullname]', faker.name.findName())
      .setValue('input[name=email]', faker.internet.email())
      .setValue('input[name=password]', 'password')
      .setValue('input[name=confirmPassword]', 'password')
      .click('#signup-button')
      .waitForElementVisible('div[id="main-dash"]', 5000)
      .assert.containsText('h4', 'ALL DOCUMENTS')
      .assert.urlEquals(`${'http://localhost:5000/dashboard'}`)
      .end();
  },
  // SIGN IN
  'Users should not be able to sign in with wrong email': (browser) => {
    browser
      .url('http://localhost:5000')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'non-existing')
      .setValue('input[name=password]', 'password123')
      .pause(1000)
      .click('#signin-button')
      .waitForElementVisible('.error-message', 5000)
      .assert.containsText('.error-message', 'Not an existing user')
      .pause(1000);
  },
  'Users should not be able to sign in with wrong password': (browser) => {
    browser
      .url('http://localhost:5000')
      .waitForElementVisible('body', 5000)
      .pause(1000)
      .setValue('input[name=email]', 'admin@gmail.com')
      .setValue('input[name=password]', 'password123')
      .pause(1000)
      .click('#signin-button')
      .waitForElementVisible('.error-message', 5000)
      .assert.containsText('.error-message', 'Invalid password')
      .pause(1000);
  },
  'Users should be able to sign in successfully with correct details':
   (browser) => {
     browser
       .url('http://localhost:5000')
       .waitForElementVisible('body', 5000)
       .setValue('input[name=email]', 'muna2@muna2.com')
       .setValue('input[name=password]', 'muna2muna2')
       .pause(1000)
       .click('#signin-button')
       .waitForElementVisible('div[id="main-dash"]', 5000)
       .assert.containsText('h4', 'ALL DOCUMENTS')
       .assert.urlEquals(`${'http://localhost:5000/dashboard'}`)
       .pause(1000)
       .end();
   },
};
