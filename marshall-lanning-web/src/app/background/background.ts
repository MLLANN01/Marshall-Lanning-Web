import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background.html',
  styleUrl: './background.css'
})
export class Background implements OnInit {
  binaryElements = new Array(100);

  constructor() {}

  randomPosition(): number {
    return Math.floor(Math.random() * 100);
  }

  randomDuration(min = 5, max = 10): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomBinary(): string {
    return Math.random() > 0.5 ? '1' : '0';
  }

  randomDelay(min = 0, max = 10): number {
    return Math.random() * (max - min) + min;
  }


  ngOnInit(): void {
    this.binaryElements = Array.from({ length: 500 }, () => ({
      left: this.randomPosition(),
      delay: this.randomDelay(0, 8),
      duration: this.randomDuration(5, 12),
      binary: this.randomBinary()
    }));
  }
}
