const { DataTypes } = require("sequelize");
// ✅ Chuyển sang bcryptjs để tránh lỗi cài đặt trên Windows
const bcrypt = require("bcryptjs");
const { sequelize } = require("../config/db");

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name cannot be empty" },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: { msg: "Email already exists" },
      allowNull: false,
      validate: {
        isEmail: { msg: "Email is not valid" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password cannot be empty" },
      },
    },
    role: {
      type: DataTypes.ENUM("employer", "candidate", "admin"),
      allowNull: false,
      defaultValue: "candidate",
    },
  },
  {
    timestamps: true,
    tableName: "users",
    hooks: {
      // Hash password trước khi lưu
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

// Hàm kiểm tra mật khẩu khi đăng nhập
User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Thiết lập quan hệ với Job
User.associate = (models) => {
  User.hasMany(models.Job, {
    foreignKey: "postedById",
    as: "jobs",
  });
};

module.exports = User;
