import { getRepository } from 'typeorm';

import Medicos from '../models/Medicos';

interface Request {
    nome: string;
    especialidade: string;
}

class MedicosController {
    public async store({ nome, especialidade }: Request): Promise<Medicos> {
        const medicosRepository = getRepository(Medicos);

        const med = medicosRepository.create({
            nome,
            especialidade,
        });

        await medicosRepository.save(med);

        return med;
    }
}

export default MedicosController;
