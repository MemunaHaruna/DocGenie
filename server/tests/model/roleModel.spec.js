import { expect } from 'chai';
import models from '../../models';
import mockData from '../mockData/mockData';

describe('Roles table', () => {
  after(() => {
    return models.Role.sequelize.sync({ force: true });
  });

  it('should have expected fields on creating admin role', (done) => {
    models.Role.create(mockData.adminRole)
      .then((roleData) => {
        expect(roleData.dataValues.title).to.equal(mockData.adminRole.title);
        expect(roleData.dataValues).to.have.property('id');
        expect(roleData.dataValues).to.have.property('createdAt');
        expect(roleData.dataValues).to.have.property('updatedAt');
        expect(roleData.dataValues.id).to.not.be.null;
        expect(roleData.dataValues.createdAt).to.not.be.null;
        expect(roleData.dataValues.updatedAt).to.not.be.null;
        done();
      });
  });
  it('should have expected fields on creating user role', (done) => {
    models.Role.create(mockData.userRole)
      .then((roleData) => {
        expect(roleData.dataValues.title).to.equal(mockData.userRole.title);
        expect(roleData.dataValues).to.have.property('id');
        expect(roleData.dataValues).to.have.property('createdAt');
        expect(roleData.dataValues).to.have.property('createdAt');
        expect(roleData.dataValues.id).to.not.be.null;
        expect(roleData.dataValues.createdAt).to.not.be.null;
        expect(roleData.dataValues.updatedAt).to.not.be.null;
        done();
      });
  });
});
