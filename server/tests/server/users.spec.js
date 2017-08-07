import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import models from '../../models';
import mockData from '../mockData/mockData';
import server from '../../../server';

chai.use(chaiHttp);

const getUserToken = (data) => {
  return new Promise((resolve, reject) => {
    chai.request(server)
      .post('/auth/api/users')
      .set('Content-Type', 'application/json')
      .send(data)
      .end((error, response) => {
        if (error) {
          return reject(error);
        }
        return resolve(response.body.token);
      });
  });
};

describe('Users', () => {
  let userToken;
  let adminToken;

  before(() => {
    return models.Role.create(mockData.adminRole)
      .then((roleData) => {
        mockData.firstUser.roleId = roleData.dataValues.id;
        return models.Role.create(mockData.userRole);
      })
      .then(() => {
        return getUserToken(mockData.firstUser);
      })
      .then((token) => {
        adminToken = token;
        return getUserToken(mockData.secondUser);
      })
      .then((token) => {
        userToken = token;
        return models.Document.bulkCreate(mockData.bulkDocuments);
      })
      .catch((error) => {
        console.log(error, 'this is an error');
      });
  });
  after(() => {
    return models.Role.sequelize.sync({ force: true });
  });

  it('should be able to sign in successfully if they are existing users',
    (done) => {
      const { email, password, username, roleId } = mockData.firstUser;
      chai.request(server)
        .post('/auth/api/users/login')
        .set('Accept', 'application/json')
        .send({ email, password })
        .end((error, response) => {
          expect(response.body.user.id).to.equal(1);
          expect(response.body.user.roleId).to.equal(roleId);
          expect(response.body.user.username).to.equal(username);
          expect(response.body.user.email).to.equal(email);
          expect(response).to.have.status(200);
          done();
        });
    });
  it('should not be able to login if they do NOT already have accounts',
    (done) => {
      const { email, password } = mockData.thirdUser;
      chai.request(server)
        .post('/auth/api/users/login')
        .set('Accept', 'application/json')
        .send({ email, password })
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.eql({ message: 'Not an existing user' });
          done();
        });
    });
  it('should not be able to access any authenticated route without a token',
    (done) => {
      chai.request(server)
        .get('/api/users')
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.eql({ message:
             'Token required for access' });
          done();
        });
    });

  it('should be able to update their account details ', (done) => {
    chai.request(server)
      .put('/api/users/2')
      .set('authorization', userToken)
      .send({ fullname: 'Mikhail Stanislaski', email: 'mikhail.s@gmail.com' })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('fullname');
        expect(response.body).to.have.property('email');
        expect(response.body.fullname).to.equal('Mikhail Stanislaski');
        expect(response.body.email).to.equal('mikhail.s@gmail.com');
        done();
      });
  });
  it('should be able to fetch all their OWN documents', (done) => {
    const { title, content } = mockData.bulkDocuments[0];
    chai.request(server)
      .get('/api/users/2/documents')
      .set('authorization', userToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.documents).to.be.an('array');
        expect(response.body).to.be.an('object').that.has
          .all.keys('documents', 'pagination');
        expect(response.body.documents[0].userId).to.equal(2);
        expect(response.body.documents[1].userId).to.equal(2);
        expect(response.body.documents[0].title).to.equal(title);
        expect(response.body.documents[0].content).to.equal(content);
        done();
      });
  });
  it('should be able to search for a particular user', (done) => {
    const { username, fullname } = mockData.firstUser;
    chai.request(server)
      .get('/api/search/users/?searchKey=admin01')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.be.an('object').that.has
          .all.keys('users', 'pagination');
        expect(response.body.users[0].username).to.equal(username);
        expect(response.body.users[0].fullname).to.equal(fullname);
        done();
      });
  });
  it('should validate that a regular user can delete their own account',
    (done) => {
      chai.request(server)
        .delete('/api/users/2')
        .set('authorization', userToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.eql({ message:
             'User deleted successfully' });
          done();
        });
    });
  it('should validate that a user cannot view a non-existent user',
    (done) => {
      chai.request(server)
        .get('/api/users/56')
        .set('authorization', userToken)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.eql({ message:
             'User Not Found' });
          done();
        });
    });
});
