import { Router } from 'express';
import { getRepository } from 'typeorm';

import MedicosController from '../app/controllers/MedicosController';
import Medicos from '../app/models/Medicos';

const medicosRouter = Router();

medicosRouter.post('/', async (request, response) => {
    try {
        const { nome, especialidade } = request.body;

        const medicosController = new MedicosController();

        const med = await medicosController.store({
            nome,
            especialidade,
        });

        return response.json(med);
    } catch (erro) {
        return response.status(400).json({ error: erro.message });
    }
});

medicosRouter.get('/', async (request, response) => {
    const medicosRepositorio = getRepository(Medicos);
    const med = await medicosRepositorio.find();
    return response.json(med);
});

medicosRouter.get('/:id', async (request, response) => {
    const medicosRepositorio = getRepository(Medicos);
    const { id } = request.params;
    const med = await medicosRepositorio.findOne(id);
    return response.json(med);
});

medicosRouter.delete('/:id', async (request, response) => {
    const medicosRepositorio = getRepository(Medicos);
    const { id } = request.params;
    await medicosRepositorio.delete(id);
    return response.send();
});

export default medicosRouter;
