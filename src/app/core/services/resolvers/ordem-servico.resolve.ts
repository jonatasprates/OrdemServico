import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OrdemServicoService } from 'src/app/core/services/ordem-servico.service';
import { OrdemServico } from 'src/app/shared/entity/OrdemServico';

@Injectable()
export class OrdemServicoResolver implements Resolve<OrdemServico> {
  constructor(private service: OrdemServicoService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<OrdemServico> {
    return this.service.getOrdemServicoById(+route.paramMap.get('id'));
  }
}
