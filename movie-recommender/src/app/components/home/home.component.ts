import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonComponent } from '../common/button/button.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {

  constructor(private router: Router) {
  }

  startQuestionnaire() {
    this.router.navigate(['/question/0']);
  }
}
