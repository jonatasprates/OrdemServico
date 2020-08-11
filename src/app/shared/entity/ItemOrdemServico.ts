import { TipoServico } from '../enum/TipoServico';

export class ItemOrdemServico {
    id: number;
    descricao: string;
    quantidade: number;
    tipoServico: TipoServico;
    valorUnitario: number;
    valorTotal: number;
}
