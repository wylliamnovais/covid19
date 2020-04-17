import { Regiao } from './regiao';

export class Dados {
    origem: string;
    dataAtualizacao: Date;
    infectado: number;
    falecido: number;
    
    infectadoRegiao: Regiao[];
    falecidoRegiao: Regiao[];
}
