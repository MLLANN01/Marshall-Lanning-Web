import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Background } from './background/background';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Background],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'marshall-lanning-web';
}

export default App;