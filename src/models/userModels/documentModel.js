module.exports = (sequelize, DataTypes) => {
    const Documents = sequelize.define(
      "document",
      {
        id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
        documentType: { type: DataTypes.STRING, allowNull: false },
        fileName: { type: DataTypes.STRING, allowNull: false },
        file: { type: DataTypes.STRING, allowNull: false },
      },
      { paranoid: true, timestamps: true }
    );
  
    Documents.associate = (models) => {
      models.documentModel.belongsTo(models.user);
    };
  
    return Documents;
  };
  