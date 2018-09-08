module.exports = (sequelize, DataTypes) => {
  const TodoItem = sequelize.define('TodoItem', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  TodoItem.associate = (models) => {
    // associations can be defined here
    TodoItem.belongsTo(models.Todo, {
      foreignKey: 'todoId',
      onDelete: 'CASCADE',
    });
  };
  return TodoItem;
};