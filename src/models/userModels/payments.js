module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define(
      "payment",
      {
        id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
        amount: { type: DataTypes.DECIMAL(20, 2), allowNull: false },
        success: { type: DataTypes.BOOLEAN, defaultValue: false },
      },
      { paranoid: true, timestamps: true }
    );
  
    Payment.associate = (models) => {
      models.payments.belongsTo(models.user);
      models.payments.belongsTo(models.incomeTaxModel);
    };
  
    return Payment;
  };
  