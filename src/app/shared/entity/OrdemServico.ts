import { Usuario } from './Usuario';
import { ItemOrdemServico } from './ItemOrdemServico';
import { Cliente } from './Cliente';
import { StatusServico } from '../enum/StatusServico';

export class OrdemServico {
    id: number;
    clienteId: number;
    usuarioId: number;
    cliente: Cliente;
    usuario: Usuario;
    statusServico: StatusServico;
    itensOrdemServico: ItemOrdemServico[];
    observacao: string;
}
