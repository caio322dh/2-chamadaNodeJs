import { Router } from 'express';
import { getRepository } from 'typeorm';

import AgendamentosController from '../app/controllers/AgendamentosController';
import Agendamentos from '../app/models/Agendamentos';

const agendamentosRouter = Router();

agendamentosRouter.post('/', async (request, response) => {
    try {
        // eslint-disable-next-line camelcase
        const { data, paciente_id, medico_id, horario } = request.body;
        const agendamentosController = new AgendamentosController();
        const agendamento = await agendamentosController.strore({
            data,
            paciente_id,
            medico_id,
            horario,
        });
        return response.json(agendamento);
    } catch (erro) {
        return response.status(400).json({ error: erro.message });
    }
});

agendamentosRouter.get('/', async (request, response) => {
    const agendamentosRepositorio = getRepository(Agendamentos);
    const age = await agendamentosRepositorio.find();
    return response.json(age);
});

agendamentosRouter.get('/:id', async (request, response) => {
    const agendamentosRepositorio = getRepository(Agendamentos);
    const { id } = request.params;
    const age = await agendamentosRepositorio.findOne(id);
    return response.json(age);
});

agendamentosRouter.delete('/:id', async (request, response) => {
    const agendamentosRepositorio = getRepository(Agendamentos);
    const { id } = request.params;
    await agendamentosRepositorio.delete(id);
    return response.send();
});

export default agendamentosRouter;
