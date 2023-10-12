import express, { Request, Response, NextFunction } from 'express';
import AlertsController from '@/controllers/alert/alerts.controller';
import NewAlertController from '@/controllers/alert/new-alert.controller';
import EditAlertController from '@/controllers/alert/edit-alert.controller';
import { TParameters } from '@/types/types';

const router = express.Router();

type TQueryGet = {
    userId: string;
    projectId: string;
    limit: string;
    page: string;
}

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, projectId, limit, page } = req.query as TQueryGet;
        
        const parameters: TParameters = {};
        if (limit) {
            parameters.limit = +limit;
        }
        if (page) {
            parameters.page = +page;
        }

        const data = await AlertsController({
            userId,
            projectId
        }, 
        parameters);

        res.json(data);
    } catch (e) {
        res.json({error: 'error'});
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { userId, message, subjectId, subjectType, projectId, structureId } = req.body;

        const data = await NewAlertController({
            userId,
            message,
            subjectId,
            subjectType,
            projectId,
            structureId
        });

        res.json(data);
    } catch (e) {
        res.json({error: 'error'});
    }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.query as {userId: string};
        let { id, read } = req.body;

        if (id !== req.params.id) {
            throw new Error('Alert ID error');
        }

        const data = await EditAlertController({
            userId,
            id,
            read
        });

        res.json(data);
    } catch (e) {
        res.json({error: 'error'});
    }
});

export default router;