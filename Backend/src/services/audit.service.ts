import AuditLog from '../db/model/AuditLog.model';

export const logAuditEvent = async (action: string, userId: number | null, details: string) => {
  try {
    await AuditLog.create({
      action,
      userId,
      details,
    });
    console.log(`Audit log created: ${action}`);
  } catch (error) {
    console.error('Error creating audit log:', error);
  }
};