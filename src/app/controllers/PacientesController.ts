import { getRepository } from 'typeorm';

import Pacientes from '../models/Pacientes';

interface Request {
    nome: string;
    email: string;
    telefone: string;
}

class PacientesController {
    public async store({ nome, email, telefone }: Request): Promise<Pacientes> {
        const pacientesRepository = getRepository(Pacientes);

        const verificaPacienteExiste = await pacientesRepository.findOne({
            where: { email },
        });

        if (verificaPacienteExiste) {
            throw new Error('Endereço de email já cadastrado');
        }

        const pac = pacientesRepository.create({
            nome,
            email,
            telefone,
        });

        await pacientesRepository.save(pac);

        return pac;
    }
}

export default PacientesController;
