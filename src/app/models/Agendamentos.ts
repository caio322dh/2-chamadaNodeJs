import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import Medicos from './Medicos';
import Pacientes from './Pacientes';

@Entity('agendamentos')
class Agendamentos {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('timestamp with time zone')
    data: Date;

    @Column()
    // eslint-disable-next-line camelcase
    paciente_id: string;

    @ManyToOne(() => Pacientes)
    @JoinColumn({ name: 'paciente_id' })
    paciente: Pacientes;

    @Column()
    // eslint-disable-next-line camelcase
    medico_id: string;

    @ManyToOne(() => Medicos)
    @JoinColumn({ name: 'medico_id' })
    medico: Medicos;

    @Column()
    horario: string;

    @CreateDateColumn()
    // eslint-disable-next-line camelcase
    created_at: Date;

    @UpdateDateColumn()
    // eslint-disable-next-line camelcase
    updated_at: Date;
}

export default Agendamentos;
