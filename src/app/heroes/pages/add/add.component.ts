import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { DeleteConfirmComponent } from '../../components/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    alt_img: '',
    publisher: Publisher.MarvelComics,
  };

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHero(id)))
      .subscribe((hero) => (this.hero = hero));
  }

  saveHero() {
    if (!this.hero.superhero.trim().length) return;

    if (this.hero.id) {
      this.heroesService.updateHero(this.hero).subscribe((hero) => {
        this.showSnakBar('Updated!');
        this.hero = hero;
      });
    } else {
      this.heroesService.addHero(this.hero).subscribe((hero) => {
        this.showSnakBar('Added succesfully!');
        this.hero = hero;
      });
    }

    setTimeout(() => {
      this.router.navigate(['/heroes/list']);
    }, 2000);
  }

  removeHero() {
    if (!this.hero.id) return;

    const modalDialog = this.dialog.open(DeleteConfirmComponent, {
      width: '300px',
      data: { ...this.hero },
    });

    modalDialog.afterClosed().subscribe((res) => {
      if (!res) return;

      this.heroesService
        .deleteHero(this.hero.id!)
        .subscribe(() => this.router.navigate(['/heroes/list']));

      this.showSnakBar(`${this.hero.superhero} was deleted!`);
    });
  }

  renderIcon() {
    return !this.hero.id?.length ? 'save' : 'edit';
  }

  showSnakBar(message: string) {
    this.snackBar.open(message, 'close', { duration: 2500 });
  }

  renderTitle(): string {
    return this.hero.id ? this.hero.superhero : 'Add a New Hero';
  }
}
