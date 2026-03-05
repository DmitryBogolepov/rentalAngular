import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
@Component({
  selector: 'app-footer',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  standalone:true,
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements OnInit{
  dateEl= document.getElementById('date');

  setYear() {
    if (this.dateEl) {
      let today = new Date();
      let year = today.getFullYear();
      this.dateEl.innerText = year.toString();
    }
  }

  ngOnInit() {
    this.setYear()
  }
}




