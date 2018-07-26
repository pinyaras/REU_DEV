import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {
  transform(list: any[], obj: any) {
    return list.filter(n => {
      !n.equals(obj)
    })
  }
}
