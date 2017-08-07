module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 60],
          msg: 'Document title must be between 2 and 60 letters'
        }
      }
    },
    access: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'Invalid access value'
        }
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: 3,
          msg: 'Document content must be longer than 3 letters'
        }
      },
    }
  }, {
    classMethods: {
      associate(models) {
        Document.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
          as: 'user'
        });
      }
    }
  });
  return Document;
};
