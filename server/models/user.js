const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [2, 30],
          msg: 'Username length must be between 2 and 30 characters'
        }
      }
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 40],
          msg: 'Fullname length must be between 3 and 40 characters'
        }
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Not a valid email'
        },
        len: {
          args: [6, 128],
          msg: 'Email length must be between 6 and 128 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 6,
          msg: 'Password length must be more than 6 characters'
        }
      }
    }
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Document, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
        User.belongsTo(models.Role, {
          foreignKey: 'roleId',
          onDelete: 'CASCADE',
          as: 'role'
        });
      }
    },
    instanceMethods: {
      // hash password
      generatePasswordHash: (user) => {
        const [_, firstItem, secondItem] = user.password.split('$');
        if (firstItem !== '2a' && secondItem !== '08') {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
        }
      },
      // validate password after user signs in
      validatePassword: (password, user) => {
        return bcrypt.compareSync(password, user.password);
      },
      // remove unwanted fields from values fetched from User table
      filterUserDetails() {
        const { password, createdAt, updatedAt, ...rest } = this.get();
        return rest;
      }
    },
    hooks: {
      beforeCreate: (user) => {
        user.generatePasswordHash(user);
      },
      beforeUpdate: (user) => {
        user.generatePasswordHash(user);
      }
    }
  });
  return User;
};
