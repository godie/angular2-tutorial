import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router';
//import { HeroDetailComponent } from './hero-detail.component'
//import {HeroDetailComponent} from '/.hero-detail.component';


@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  styleUrls: ['./heroes.component.css'],
  templateUrl: './heroes.component.html',
  providers: [HeroService]
})

export class HeroesComponent implements OnInit  { 
	name = 'Angular'; 
	title = 'Tour of Heroes';
	heroes : Hero[];
	selectedHero : Hero;

  constructor(private heroService: HeroService, private router: Router){}

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes );
  }

  ngOnInit(): void {
    this.getHeroes();
  }

	onSelect(hero: Hero): void {
		this.selectedHero = hero;
	}

  goDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if(!name) { return; }
    this.heroService.create(name)
    .then(hero => {
      this.heroes.push(hero);
      this.selectedHero = null;
    });
  }

  delete(hero: Hero): void {
    this.heroService
    .delete(hero.id)
    .then( () => {
      this.heroes = this.heroes.filter( h => h !== hero);
      if(this.selectedHero === hero){ this.selectedHero = null; }
    });
  }

	};





