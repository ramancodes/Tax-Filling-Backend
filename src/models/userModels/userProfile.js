module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define(
    "UserProfile",
    {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      firstName: { type: DataTypes.STRING, allowNull: false },
      middleName: { type: DataTypes.STRING },
      lastName: { type: DataTypes.STRING, allowNull: false },
      gender: { type: DataTypes.STRING, allowNull: false },
      dob: { type: DataTypes.DATE, allowNull: false },
      phoneNo: { type: DataTypes.BIGINT, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      occupation: { type: DataTypes.STRING, allowNull: false },
      website: { type: DataTypes.STRING },
    },
    { paranoid: true, timestamps: true }
  );

  UserProfile.associate = (models) => {
    models.userProfile.belongsTo(models.user);
  }

  return UserProfile;
};
