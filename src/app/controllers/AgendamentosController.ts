import { getRepository } from 'typeorm';
import Agendamentos from '../models/Agendamentos';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Request {
    data: Date;
    // eslint-disable-next-line camelcase
    paciente_id: string;
    // eslint-disable-next-line camelcase
    medico_id: string;
    horario: string;
}
class AgendamentosController {
    public async strore({
        data,
        // eslint-disable-next-line camelcase
        paciente_id,
        // eslint-disable-next-line camelcase
        medico_id,
        horario,
    }: Request): Promise<Agendamentos> {
        const agendamentosRepository = getRepository(Agendamentos);
        const agendamento = agendamentosRepository.create({
            data,
            paciente_id,
            medico_id,
            horario,
        });
        await agendamentosRepository.save(agendamento);
        return agendamento;
    }
}

export default AgendamentosController;
