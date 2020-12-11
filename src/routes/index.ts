import { Router } from 'express';

import medicosRouter from './medicos.routes';
import pacientesRouter from './pacientes.routes';
import agendamentosRouter from './agendamentos.routes';

const routes = Router();

routes.use('/medicos', medicosRouter);
routes.use('/pacientes', pacientesRouter);
routes.use('/agendamentos', agendamentosRouter);

export default routes;
