const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const Job = require("./Job");

const Applicant = sequelize.define("Applicant", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  resume: {
    type: DataTypes.STRING, // đường dẫn file CV (/uploads/filename.pdf)
    allowNull: true,
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Job.tableName,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  appliedById: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User.tableName,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

// ==================== QUAN HỆ ====================
User.hasMany(Applicant, { as: "applications", foreignKey: "appliedById" });
Applicant.belongsTo(User, { as: "applicant", foreignKey: "appliedById" });

Job.hasMany(Applicant, { as: "applications", foreignKey: "jobId" });
Applicant.belongsTo(Job, { as: "job", foreignKey: "jobId" });

module.exports = Applicant;
