import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'imagePipe',
  pure: false,
})
export class ImagePipe implements PipeTransform {
  transform(hero: Hero): string {
    if (!hero.id || (hero.hasOwnProperty('alt_img') && !hero.alt_img))
      return 'assets/no-image.png';

    return hero.alt_img ? hero.alt_img : `assets/heroes/${hero.id}.jpg`;
  }
}
