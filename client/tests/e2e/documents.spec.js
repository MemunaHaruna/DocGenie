module.exports = {
  'Users should be able to sign in and create a new document': (browser) => {
    browser
      .url('http://localhost:5000')
      .waitForElementVisible('body', 5000)
      .pause(2000)
      .setValue('input[name=email]', 'muna2@muna2.com')
      .setValue('input[name=password]', 'muna2muna2')
      .click('#signin-button')
      .waitForElementVisible('div[id="main-dash"]', 90000)
      .assert.containsText('h4', 'ALL DOCUMENTS')
      .assert.urlEquals(`${'http://localhost:5000/dashboard'}`)
      .click('#create-doc-btn')
      .waitForElementVisible('#created-new-document', 9000)
      .pause(1000)
      .waitForElementVisible('.fr-box', 5000)
      .setValue('input[name=title]', 'e2e test doc')
      .setValue('select[name=access]', 'Public')
      .waitForElementVisible('.fr-element', 3000)
      .waitForElementVisible('.fr-view', 3000)
      .setValue('div.fr-element', 'froala content here')
      .click('#save-doc')
      .pause(2000)
      .waitForElementVisible('.toast-message', 3000)
      .assert.containsText('.toast-message', 'Document created!')
      .pause(1000)
      .assert.containsText('#doc-title', 'e2e test doc');
  },
  'Signed in user should be able to edit their document': (browser) => {
    browser
      .url('http://localhost:5000')
      .waitForElementVisible('body', 5000)
      .pause(1000)
      .waitForElementVisible('div[id="main-dash"]', 9000)
      .assert.containsText('h4', 'ALL DOCUMENTS')
      .assert.urlEquals(`${'http://localhost:5000/dashboard'}`)
      .waitForElementVisible('div[id="form-card-action"]', 9000)
      .waitForElementVisible('#edit', 5000)
      .click('#edit')
      .pause(1000)
      .waitForElementVisible('.fr-box', 5000)
      .setValue('input[name=title]', ' edited')
      .setValue('select[name=access]', 'Private')
      .waitForElementVisible('.fr-element', 3000)
      .waitForElementVisible('.fr-view', 3000)
      .setValue('div.fr-element', 'now edited ')
      .click('#save-doc')
      .pause(2000)
      .waitForElementVisible('.toast-message', 3000)
      .assert.containsText('.toast-message', 'Document edited!')
      .assert.containsText('#doc-title', 'e2e test doc edited')
      .pause(1000);
  },
  'Signed in user should be able to view documents': (browser) => {
    browser
      .url('http://localhost:5000')
      .waitForElementVisible('body', 5000)
      .pause(1000)
      .waitForElementVisible('div[id="main-dash"]', 9000)
      .assert.containsText('h4', 'ALL DOCUMENTS')
      .assert.urlEquals(`${'http://localhost:5000/dashboard'}`)
      .waitForElementVisible('div[id="form-card-action"]', 5000)
      .waitForElementVisible('#show-more', 5000)
      .click('#show-more')
      .pause(1000)
      .waitForElementVisible('.viewOneDocument', 2000)
      .assert.containsText('h4', 'e2e test doc edited')
      .assert.containsText('#doc-content', 'now edited froala content here')
      .pause(1000);
  },
  'Signed in user should be able to delete their document': (browser) => {
    browser
      .url('http://localhost:5000')
      .waitForElementVisible('body', 5000)
      .pause(1000)
      .waitForElementVisible('div[id="main-dash"]', 9000)
      .assert.containsText('h4', 'ALL DOCUMENTS')
      .assert.urlEquals(`${'http://localhost:5000/dashboard'}`)
      .waitForElementVisible('div[id="form-card-action"]', 5000)
      .waitForElementVisible('#delete', 5000)
      .click('#delete')
      .pause(1000)
      .waitForElementVisible('.sweet-alert', 3000)
      .pause(1000)
      .click('.confirm')
      .assert.containsText('h2', 'Deleted!')
      .pause(1000);
  },
  'Signed in user should be able to search for already created document(s)':
   (browser) => {
     browser
       .url('http://localhost:5000')
       .waitForElementVisible('body', 5000)
       .pause(1000)
       .waitForElementVisible('div[id="main-dash"]', 9000)
       .assert.containsText('h4', 'ALL DOCUMENTS')
       .assert.urlEquals(`${'http://localhost:5000/dashboard'}`)
       .waitForElementVisible('div[id="search-docs"]', 5000)
       .setValue('input[name=searchKey]', 'e2e test doc')
       .pause(2000)
       .assert.containsText('#doc-title', 'e2e test doc')
       .pause(2000)
       .end();
   },
};
