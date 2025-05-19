const { userProfile } = require("../validations/userProfileValidator");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, allowNull: false },
      userProfileId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "userProfiles",
          key: "id",
        },
      },
      bankDetailId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "bankDetails",
          key: "id",
        },
      },
      documentId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "documents",
          key: "id",
        },
      },
      incomeSourcesId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "incomeSources",
          key: "id",
        },
      },
      incomeTaxesId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "incomeTaxes",
          key: "id",
        },
      }
    },
    
    { paranoid: true, timestamps: true }
  );

  User.associate = (models) => {
    models.user.hasOne(models.userProfile);
    models.user.hasMany(models.incomeSources);
    models.user.hasMany(models.incomeTaxModel);
    models.user.hasMany(models.bankDetails);
    models.user.hasMany(models.documentModel);
  };

  return User;
};
