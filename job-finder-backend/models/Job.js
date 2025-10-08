const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");

const Job = sequelize.define("Job", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  salary: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING, // full-time | part-time | remote | freelance
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true, // đường dẫn file upload (/uploads/filename.png)
  },
  qualification: {
    type: DataTypes.TEXT,
    allowNull: true, // lưu JSON string (chuẩn hóa danh sách yêu cầu)
  },
  postedById: {
    type: DataTypes.INTEGER,
    allowNull: false, // 🔒 Mỗi job phải có 1 người đăng
    references: {
      model: User.tableName, // ✅ Dùng tableName thay vì "Users"
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

// 🧩 Quan hệ: 1 User (employer) có nhiều Job
User.hasMany(Job, {
  as: "jobs",
  foreignKey: "postedById",
  onDelete: "CASCADE",
});
Job.belongsTo(User, { as: "postedBy", foreignKey: "postedById" });

module.exports = Job;
