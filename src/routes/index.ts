import { RoutesInput } from '@/types/types'
import alert from './alert.route'

export default ({ app }: RoutesInput) => {
    app.use('/api/alerts', alert);
};