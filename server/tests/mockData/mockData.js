import faker from 'faker';
import bcrypt from 'bcrypt-nodejs';

export default {
  firstUser: {
    username: 'admin01',
    fullname: 'admin tester',
    email: faker.internet.email(),
    password: 'admintester',
    confirmPassword: 'admintester',
  },
  secondUser: {
    username: faker.internet.userName(),
    fullname: faker.name.findName(),
    email: faker.internet.email(),
    password: 'regulartester',
    confirmPassword: 'regulartester',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  thirdUser: {
    username: faker.internet.userName(),
    fullname: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  privateDocument: {
    title: 'private document',
    content: 'private document created',
    access: -1
  },
  testUser: {
    id: 23,
    username: 'test01',
    fullname: 'test user',
    email: faker.internet.email(),
    password: 'tester',
    confirmPassword: 'tester'
  },
  roleDocument: {
    title: 'role document',
    content: 'role document created',
    access: 1,
    userId: 1
  },
  publicDocument: {
    userId: 1,
    title: 'public document',
    content: 'public document created',
    access: 0,
  },
  testPublicDocument: {
    id: 21,
    title: 'public document',
    content: 'public document created',
    access: 0,
    userId: 2,
  },
  userPublicDocument: {
    title: 'user public document',
    content: 'user public document created',
    access: 0,
    userId: 2,
  },
  userPrivateDocument: {
    title: 'user private document',
    content: 'user private document created',
    access: -1,
    userId: 2,
  },
  sampleDocument: {
    title: 'sample document',
    content: faker.lorem.paragraph(),
    access: -1,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  invalidDocument: {
    title: faker.lorem.words(),
    access: -1,
    userId: 1,
  },
  bulkDocuments: [{
    title: 'first document',
    content: faker.lorem.text(),
    access: 0,
    userId: 2,
  }, {
    title: faker.commerce.productName(),
    content: faker.commerce.product(),
    access: 0,
    userId: 1,
  }, {
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs(),
    access: 0,
    userId: 2,
  }, {
    title: faker.lorem.word(),
    content: faker.lorem.sentences(),
    access: 0,
    userId: 1,
  }],
  editorOne: {
    username: 'janey',
    fullname: 'jane doe',
    email: faker.internet.email(),
    password: bcrypt.hashSync('janey', bcrypt.genSaltSync(8)),
    roleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  editorTwo: {
    fullname: faker.name.findName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync('hacksaw', bcrypt.genSaltSync(8)),
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  invalidUserDetails: {
    username: faker.internet.userName(),
    fullname: faker.name.findName(),
    email: 'tuna@gmail.com',
    password: faker.internet.password(),
    roleId: 2
  },
  invalidToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZUlkIjoyLCJpYXQiOjE0OTM2MjQ5MTcsImV4cCI6MTQ5MzcxMTMxN30.A3dy4bPUEa3QsML03UKDjqC9wcmAjV0ub8aWu1niaL',
  roleOne: {
    title: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  roleTwo: {
    title: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  adminRole: {
    title: 'admin',
  },
  userRole: {
    title: 'user',
  }
};
