module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
      project: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      done: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
      },
  }, {
    classMethods: {
      // associate: (models) => {
      //   Todo.hasMany(models.TodoItem, {
      //     foreignKey: 'todoId',
      //     as: 'todoItems',
      //   });
      // },
    },
  });
  return Todo;
};
