import { Component, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink, RouterLinkActive
  ],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements AfterViewInit {
  @ViewChild('burgerMenu') burgerMenu!: ElementRef;
  @ViewChild('menuOverlay') menuOverlay!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;
  @ViewChild('menuMobile') menuMobile!: ElementRef;
  @ViewChildren('itemLink') itemLinks!: QueryList<ElementRef>;
  constructor(private router: Router) {}
  ngAfterViewInit() {
    this.itemLinks.changes.subscribe(() => {
      this.addLinkListeners();
    });

    this.addLinkListeners();
  }

  toggleBurgerMenu() {
    const burger = this.burgerMenu.nativeElement;
    const menuMobile = this.menuMobile.nativeElement;
    const overlay = this.menuOverlay.nativeElement;

    burger.classList.toggle('active');
    menuMobile.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = menuMobile.classList.contains('active') ? 'hidden' : '';
  }

  overLayAction() {
    this.closeMenu();
  }

  private addLinkListeners() {
    this.itemLinks.forEach((linkRef: ElementRef) => {
      linkRef.nativeElement.removeEventListener('click', this.closeMenu.bind(this));
      linkRef.nativeElement.addEventListener('click', this.closeMenu.bind(this));
    });
  }

  private closeMenu = () => {
    const burger = this.burgerMenu?.nativeElement;
    const menuMobile = this.menuMobile?.nativeElement;
    const overlay = this.menuOverlay?.nativeElement;

    if (burger && menuMobile && overlay) {
      burger.classList.remove('active');
      menuMobile.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  navigateToSection(section: string) {

    this.overLayAction();


    if (this.router.url === '/' || this.router.url.startsWith('/#')) {
      this.scrollToElement(section);
    } else {

      this.router.navigate(['/'], { fragment: section }).then(() => {
        this.scrollToElement(section);
      });
    }
  }

  private scrollToElement(section: string) {
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 100);
  }
}
