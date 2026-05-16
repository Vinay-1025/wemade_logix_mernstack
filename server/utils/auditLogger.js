const AuditLog = require('../models/AuditLog');

const logAction = async (user, action, details, targetId = null, targetType = null) => {
  try {
    await AuditLog.create({
      userId: user._id,
      userName: user.name,
      action,
      details,
      targetId,
      targetType
    });
  } catch (error) {
    console.error('Audit Log Error:', error);
  }
};

module.exports = logAction;
