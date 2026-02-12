import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
}

@Injectable({
  providedIn: 'root'
})
export class MockPortfolioService {
  
  private about = {
    name: 'Xavier',
    location: 'Belo Horizonte, MG',
    bio: 'Desenvolvedor full-stack apaixonado por criar experiências interativas. Atualmente focado em Angular + Spring Boot.',
    skills: ['Spring Boot','Angular','MySql','PostgreesSql', 'Cloud']
  };

  private projects: Project[] = [
    {
      title: 'RequestMe.dev',
      description: 'Portfólio interativo no estilo Postman. Faça requests para descobrir mais sobre mim!',
      tech: ['Angular'],
      link: 'https://github.com/seuuser/requestme'
    },
  ];


  //Calcula idade exata.
  private getAge(): number {
  const birthDate = new Date(2005, 2, 25);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 || 
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
}