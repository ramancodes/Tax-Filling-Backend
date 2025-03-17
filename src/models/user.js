module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "Users",
    {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, allowNull: false },
      // userId: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   references: { model: "Users", key: "id" },
      //   onDelete: "CASCADE",
      // },
    },
    { paranoid: true, timestamps: true }
  );

  // User.associate = (models) => {
  //   models.user.hasOne(models.userProfile);
  // };

  return User;
};
