module.exports = (sequelize, DataTypes) => {
  const IncomeTax = sequelize.define(
    "incomeTax",
    {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      assessmentYear: { type: DataTypes.STRING, allowNull: false },
      filingType: { type: DataTypes.STRING, allowNull: false },
      itrType: { type: DataTypes.STRING, allowNull: false },
      file: { type: DataTypes.STRING, allowNull: false },
      taxAmount: { type: DataTypes.DECIMAL(20, 2), allowNull: false },
      incomeDetails: { type: DataTypes.ARRAY(DataTypes.JSONB) },
    },
    { paranoid: true, timestamps: true }
  );

  IncomeTax.associate = (models) => {
    models.incomeTaxModel.belongsTo(models.user);
  };

  return IncomeTax;
};
