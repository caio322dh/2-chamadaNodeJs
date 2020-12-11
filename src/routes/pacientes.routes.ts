import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import PacientesController from '../app/controllers/PacientesController';
import Pacientes from '../app/models/Pacientes';
import uploadConfig from '../config/upload';
import AvatarPacientesController from '../app/controllers/AvatarPacientesController';

const pacientesRouter = Router();
const upload = multer(uploadConfig);

pacientesRouter.post('/', async (request, response) => {
    try {
        const { nome, email, telefone } = request.body;

        const pacientesController = new PacientesController();

        const pac = await pacientesController.store({
            nome,
            email,
            telefone,
        });

        return response.json(pac);
    } catch (erro) {
        return response.status(400).json({ error: erro.message });
    }
});

pacientesRouter.get('/', async (request, response) => {
    const pacientesRepositorio = getRepository(Pacientes);
    const pac = await pacientesRepositorio.find();
    return response.json(pac);
});

pacientesRouter.get('/:id', async (request, response) => {
    const pacientesRepositorio = getRepository(Pacientes);
    const { id } = request.params;
    const pac = await pacientesRepositorio.findOne(id);
    return response.json(pac);
});

pacientesRouter.delete('/:id', async (request, response) => {
    const pacientesRepositorio = getRepository(Pacientes);
    const { id } = request.params;
    await pacientesRepositorio.delete(id);
    return response.send();
});

// pacientesRouter.patch(
//     '/pacientes/avatar:id',
//     upload.single('avatar'),
//     async (request, response) => {
//         try {
//             const avatarPacientesController = new AvatarPacientesController();
//             const pac = await avatarPacientesController.update({
//                 pac_id: request.params.id,
//                 avatarFileName: request.file.filename,
//             });
//             console.log(request.file);
//             return response.json(pac);
//         } catch (err) {
//             return response.status(400).json({ error: err.message });
//         }
//     },
// );

export default pacientesRouter;
