import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // this is now the default style in Angular 17+
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class AppComponent {
  title = 'angularProject';
}
