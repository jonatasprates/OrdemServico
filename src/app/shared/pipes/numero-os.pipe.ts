import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'numeroOS'
})
export class NumeroOsPipe implements PipeTransform {
    transform(idOrdemServico: number) {
        return `${idOrdemServico}`.padStart(5, '0');
    }
}
