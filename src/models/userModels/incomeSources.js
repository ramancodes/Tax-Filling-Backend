module.exports = (sequelize, DataTypes) => {
    const IncomeSources = sequelize.define(
      "incomeSource",
      {
        id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
        incomeType: { type: DataTypes.STRING, allowNull: false },
        source: { type: DataTypes.STRING, allowNull: false },
        amountPerAnnum: { type: DataTypes.BIGINT, allowNull: false },
      },
      { paranoid: true, timestamps: true }
    );
  
    IncomeSources.associate = (models) => {
      models.incomeSources.belongsTo(models.user);
    };
  
    return IncomeSources;
  };
  