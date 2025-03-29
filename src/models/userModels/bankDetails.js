module.exports = (sequelize, DataTypes) => {
  const BankDetails = sequelize.define(
    "bankDetail",
    {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      bankName: { type: DataTypes.STRING, allowNull: false },
      accountNumber: { type: DataTypes.BIGINT, allowNull: false },
      customerId: { type: DataTypes.BIGINT, allowNull: false },
      ifscCode: { type: DataTypes.STRING, allowNull: false },
    },
    { paranoid: true, timestamps: true }
  );

  BankDetails.associate = (models) => {
    models.bankDetails.belongsTo(models.user);
  };

  return BankDetails;
};
