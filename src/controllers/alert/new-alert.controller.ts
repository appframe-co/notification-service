import Alert from '@/models/alert.model'
import { TAlert, TAlertModel, TErrorResponse } from '@/types/types'

type TAlertInput = {
    userId: string;
    message: string;
    subjectId: string;
    subjectType: string;
    projectId: string;
    structureId: string;
}

export default async function CreateAlert({userId, message, subjectId, subjectType, projectId, structureId}: TAlertInput): Promise<TErrorResponse | {alert: TAlert}> {
    try {
        if (!message) {
            return {error: 'invalid_request'};
        }

        message = message.trim();
        if (message.length < 1 || message.length > 160) {
            return {error: 'invalid_request', description: 'Number of characters from 1 to 160.', property: 'message'};
        }

        const alert: TAlertModel = await Alert.create({
            userId, 
            message,
            subjectId,
            subjectType,
            projectId,
            structureId,
            createdAt: new Date()
        });
        if (!alert) {
            return {error: 'invalid_alert'};
        }

        const output = {
            id: alert.id,
            message: alert.message,
            subjectId: alert.subjectId,
            subjectType: alert.subjectType,
            createdAt: alert.createdAt,
            read: alert.read,
            userId: alert.userId,
            structureId: alert.structureId,
            projectId: alert.projectId
        };

        return {alert: output};
    } catch (error) {
        throw error;
    }
}