import { Router } from 'express';
import chatRoutes from './ChatRoutes';
import pictureRoutes from './PictureRoutes';

const router = Router();

const defaultRoutes = [
    {
        path: '/chat',
        route: chatRoutes,
    },
    {
        path: '/picture',
        route: pictureRoutes,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
