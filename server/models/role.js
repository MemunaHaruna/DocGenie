module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: 3,
          msg: 'Role title must be longer than 3 letters'
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Role.hasMany(models.User, {
          foreignKey: 'roleId',
        });
      },
      },
    });
  return Role;
};
