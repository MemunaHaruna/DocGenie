import { expect } from 'chai';
import models from '../../models';
import mockData from '../mockData/mockData';

describe('User table', () => {
  after(() => {
    return models.User.sequelize.sync({ force: true });
  });

  it('should have expected fields on creating a user', (done) => {
    let roleData;
    const { username, fullname, email } = mockData.firstUser;
    models.Role.create(mockData.adminRole)
      .then((roleTempData) => {
        roleData = { ...roleTempData };
        mockData.firstUser.roleId = roleData.dataValues.id;
      })
      .then(() => {
        models.User.create(mockData.firstUser)
          .then((user) => {
            expect(user.dataValues.username).to.equal(username);
            expect(user.dataValues.fullname).to.equal(fullname);
            expect(user.dataValues.email).to.equal(email);
            expect(user.dataValues).to.have.property('roleId');
            expect(user.dataValues).to.have.property('password');
            expect(user.dataValues).to.have.property('createdAt');
          });
      });
    done();
  });
});
