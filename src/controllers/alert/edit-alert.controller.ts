import Alert from '@/models/alert.model'
import { TAlert, TAlertModel, TErrorResponse } from '@/types/types'

type TAlertInput = {
    userId: string;
    id: string;
    read: boolean;
}

export default async function EditAlertController({userId, id, read}: TAlertInput): Promise<TErrorResponse | {alert: TAlert}> {
    try {
        const alert: TAlertModel|null = await Alert.findOneAndUpdate({
            userId, 
            _id: id
        }, {read}, {new: true});
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
            userId: alert.userId
        };

        return {alert: output};
    } catch (error) {
        throw error;
    }
}