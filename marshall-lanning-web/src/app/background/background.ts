import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Matter from 'matter-js';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #canvas></canvas>`,
  styleUrls: ['./background.css']
})
export class Background implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private engine = Matter.Engine.create();
  private render!: Matter.Render;
  private runner = Matter.Runner.create();

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;

    // Setup renderer
    this.render = Matter.Render.create({
      canvas,
      engine: this.engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent'
      }
    });

    // Run engine & renderer
    Matter.Render.run(this.render);
    Matter.Runner.run(this.runner, this.engine);

    // Add test lines
    this.addStaticLines();

    // Add falling rectangles (placeholder for notes)
    this.spawnTestBlocks(20);

    // Add ground
    const ground = Matter.Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight + 50,
      window.innerWidth,
      100,
      {
        isStatic: true,
        render: { fillStyle: 'rgba(255,255,255,0.2)' }
      }
    );
    Matter.World.add(this.engine.world, ground);
  }

  addStaticLines(): void {
    const world = this.engine.world;

    for (let i = 0; i < 8; i++) {
      const angle = Math.random() > 0.5 ? 0 : Math.PI / 6; // horizontal or diagonal
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      const line = Matter.Bodies.rectangle(x, y, 150, 4, {
        isStatic: true,
        angle,
        render: {
          fillStyle: 'rgba(255, 255, 255, 0.3)'
        }
      });

      Matter.World.add(world, line);
    }
  }

  spawnTestBlocks(count: number): void {
    const world = this.engine.world;

    for (let i = 0; i < count; i++) {
      const x = Math.random() * window.innerWidth;
      const box = Matter.Bodies.rectangle(x, -Math.random() * 200, 20, 20, {
        restitution: 0.8,
        render: {
          fillStyle: 'white'
        }
      });

      Matter.World.add(world, box);
    }
  }

  ngOnDestroy(): void {
    Matter.Render.stop(this.render);
    Matter.World.clear(this.engine.world, false);
    Matter.Engine.clear(this.engine);
    this.render.canvas.remove();
    this.render.textures = {};
  }
}
