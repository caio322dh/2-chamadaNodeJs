import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Pacientes from '../models/Pacientes';
import uploadConfig from '../../config/upload';

interface Request {
    // eslint-disable-next-line camelcase
    pac_id: string;
    avatarFileName: string;
}

class AvatarPacientesController {
    public async update({
        // eslint-disable-next-line camelcase
        pac_id,
        avatarFileName,
    }: Request): Promise<Pacientes> {
        const pacientesRepository = getRepository(Pacientes);
        const pac = await pacientesRepository.findOne(pac_id);
        if (!pac) {
            throw new Error('Paciente não exite');
        }
        if (pac.avatar) {
            const pacAvatarFilePath = path.join(
                uploadConfig.directory,
                pac.avatar,
            );
            const pacAvatarFileExists = await fs.promises.stat(
                pacAvatarFilePath,
            );
            if (pacAvatarFileExists) {
                await fs.promises.unlink(pacAvatarFilePath);
            }
        }
        pac.avatar = avatarFileName;
        await pacientesRepository.save(pac);
        return pac;
    }
}

export default AvatarPacientesController;
