const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Lấy token từ header Authorization (hỗ trợ cả 'authorization' hoặc 'Authorization')
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Không có token hoặc định dạng không hợp lệ" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Lưu thông tin user vào request
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res
      .status(401)
      .json({ error: "Token không hợp lệ hoặc đã hết hạn" });
  }
};

module.exports = authMiddleware;
