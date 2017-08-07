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

describe('Roles Controller', () => {
  let adminToken;
  let userToken;

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

  it('should validate that a regular user cannot create a new role',
    (done) => {
      chai.request(server)
        .get('/api/roles')
        .set('authorization', userToken)
        .end((error, response) => {
          expect(response).to.have.status(403);
          expect(response.body).to.eql({ message:
             'Sorry, You are not authorized to perform this action' });
          done();
        });
    });

  it('should validate that a regular user cannot delete a role',
    (done) => {
      chai.request(server)
        .delete('/api/roles/1')
        .set('authorization', userToken)
        .end((error, response) => {
          expect(response).to.have.status(403);
          expect(response.body).to.eql({ message:
             'Sorry, You are not authorized to perform this action' });
          done();
        });
    });
  it('should validate that a role that already exists cannot be re-created',
    (done) => {
      chai.request(server)
        .post('/api/roles/')
        .set('authorization', adminToken)
        .send({ title: 'admin' })
        .end((error, response) => {
          expect(response).to.have.status(409);
          expect(response.body).to.eql({ message:
           'Role already exists' });
          done();
        });
    });
  it('should validate that an admin user can create a new role',
    (done) => {
      chai.request(server)
        .post('/api/roles')
        .set('authorization', adminToken)
        .send({ title: 'guest' })
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.have.property('id');
          expect(response.body).to.have.property('title');
          expect(response.body.title).to.equal('guest');
          done();
        });
    });
  it('should validate that an admin user can view all available roles',
    (done) => {
      chai.request(server)
        .get('/api/roles')
        .set('authorization', adminToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('array');
          expect(response.body[0].id).to.equal(1);
          expect(response.body[0].title).to.equal('admin');
          expect(response.body[1].id).to.equal(2);
          expect(response.body[1].title).to.equal('user');
          expect(response.body[2].id).to.equal(3);
          expect(response.body[2].title).to.equal('guest');
          done();
        });
    });
  it('should validate that an admin user can delete a role',
    (done) => {
      chai.request(server)
        .delete('/api/roles/3')
        .set('authorization', adminToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.eql({ message:
             'Role deleted successfully' });
          done();
        });
    });
  it('should validate that an admin user cannot delete a non-existent role',
    (done) => {
      chai.request(server)
        .delete('/api/roles/5')
        .set('authorization', adminToken)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.eql({ message: 'Role Not Found' });
          done();
        });
    });
});
