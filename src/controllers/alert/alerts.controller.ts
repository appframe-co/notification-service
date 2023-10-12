import Alert from '@/models/alert.model'
import {TAlert, TAlertModel, TErrorResponse, TParameters, TSort} from '@/types/types'

type TAlertInput = {
	userId: string; 
	projectId: string;
}

export default async function AlertList(entryInput: TAlertInput, parameters: TParameters = {}): Promise<TErrorResponse | {alerts: TAlert[]}> {
    try {
        const {userId, projectId} = entryInput;

        if (!userId || !projectId) {
            throw new Error('userId & projectId query required');
        }

        const sort: TSort = {};
        const defaultLimit = 10;

        const filter: any = {userId, $or: [{projectId}, {projectId: null}]};
        let {limit=defaultLimit, page=1} = parameters;

        if (limit > 250) {
            limit = defaultLimit;
        }

        const skip = (page - 1) * limit;

        sort['_id'] = 'desc';

        const alerts: TAlertModel[] = await Alert.find(filter).skip(skip).limit(limit).sort(sort);
        if (!alerts) {
            return {error: 'invalid_alert'};
        }

        const output = alerts.map(alert => ({
            id: alert.id,
            userId: alert.userId,
            projectId: alert.projectId,
            structureId: alert.structureId,
            message: alert.message,
            subjectId: alert.subjectId,
            subjectType: alert.subjectType,
            read: alert.read,
            createdAt: alert.createdAt
        }));

        return {alerts: output};
    } catch (error) {
        throw error;
    }
}