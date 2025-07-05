import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Matter from 'matter-js';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background.html',
  styleUrls: ['./background.css']
})
export class Background implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private engine = Matter.Engine.create();
  private render!: Matter.Render;
  private runner = Matter.Runner.create();
  private spawnIntervalId: any;

  circle?: { x: number; y: number; radius: number };
  rectangle?: { x: number; y: number; width: number; height: number };
  triangle?: { x: number; y: number; width: number; height: number };

  icons = [
    { src: 'assets/icons/linkedin.svg', href: 'https://www.linkedin.com/in/marshall-lanning/overlay/background-image/' },
    { src: 'assets/icons/github.svg', href: 'https://github.com/MLLANN01' },
    { src: 'assets/icons/soundcloud.svg', href: 'https://soundcloud.com/user-723992281' },
    { src: 'assets/icons/steam.svg', href: 'https://steamcommunity.com/id/MGLL414/' }
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;

    window.addEventListener('resize', this.onResize);

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

    Matter.Render.run(this.render);
    Matter.Runner.run(this.runner, this.engine);

    this.setupScene();
  }

  setupScene(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const world = this.engine.world;

    const sizeRef = Math.min(width, height);
    const radius = sizeRef * 0.3;
    const centerX = width / 2;
    const centerY = (height / 2) * 1.15;

    const circle = Matter.Bodies.circle(centerX, centerY, radius / 2, {
      isStatic: true,
      render: { visible: false }
    });

    this.circle = { x: centerX, y: centerY, radius: radius / 2 };

    const rectWidth = radius * 1.5;
    const rectHeight = radius * 0.2;
    const rectangle = Matter.Bodies.rectangle(centerX, centerY + radius * 0.75, rectWidth, rectHeight, {
      isStatic: true,
      render: { visible: false }
    });

    this.rectangle = {
      x: centerX - rectWidth / 2,
      y: centerY + radius * 0.75 - rectHeight / 2,
      width: rectWidth,
      height: rectHeight
    };

    const triangleSize = radius;
    const triangle = Matter.Bodies.fromVertices(
      centerX,
      centerY * 1.175,
      [[
        { x: 0, y: -triangleSize * 0.5 },
        { x: -triangleSize * 1.5, y: triangleSize * 2 },
        { x: triangleSize * 1.5, y: triangleSize * 2 }
      ]],
      {
        isStatic: true,
        render: { fillStyle: 'transparent', strokeStyle: 'white', lineWidth: 1 }
      },
      true
    );

    this.triangle = {
      x: triangle.bounds.min.x,
      y: triangle.bounds.min.y,
      width: triangle.bounds.max.x - triangle.bounds.min.x,
      height: triangle.bounds.max.y - triangle.bounds.min.y
    };

    Matter.World.add(world, [circle, rectangle, triangle]);
    this.startContinuousSpawning();

    const ground = Matter.Bodies.rectangle(width / 2, height + 50, width, 100, {
      isStatic: true,
      render: { fillStyle: 'rgba(255,255,255,0.2)' }
    });

    Matter.World.add(world, ground);

    this.cdr.detectChanges(); // ensure UI sync
  }

  startContinuousSpawning(): void {

    if (this.spawnIntervalId) {
      clearInterval(this.spawnIntervalId);
    }

    this.spawnIntervalId = setInterval(() => {
      this.spawnFallingItem();
    }, 300);
  }


  spawnFallingItem(): void {
    const world = this.engine.world;
    const x = Math.random() * window.innerWidth;
    const y = -30;

    const options: Matter.IChamferableBodyDefinition = {
      restitution: 0.8,
      render: {}
    };

    /* based on quarter note */
    const verticies = [
      { x: 0, y: 0 },
      { x: 8, y: 2 },
      { x: 10, y: 10 },
      { x: 8, y: 18 },
      { x: 0, y: 20 },
      { x: -8, y: 18 },
      { x: -10, y: 10 },
      { x: -8, y: 2 }
    ];

    const choice = Math.floor(Math.random() * 3);
    let body: Matter.Body;
    if (choice === 0) {
      // 0
      body = Matter.Bodies.fromVertices(x, y, [verticies], {
        restitution: 0.8,
        render: {
          sprite: {
            texture: 'assets/icons/0.svg',
            xScale: 0.01,
            yScale: 0.01
          }
        }
      }, true);
    } else if (choice === 1) {
      // 1
      body = Matter.Bodies.fromVertices(x, y, [verticies], {
        restitution: 0.8,
        render: {
          sprite: {
            texture: 'assets/icons/1.svg',
            xScale: 0.01,
            yScale: 0.01
          }
        }
      }, true);
    } else if (choice === 2) {
      // quarter note
      body = Matter.Bodies.fromVertices(x, y, [verticies], {
        restitution: 0.8,
        render: {
          sprite: {
            texture: 'assets/icons/quarter_note.svg',
            xScale: 0.25,
            yScale: 0.25
          }
        }
      }, true);
    } else {
      // eighth note
      body = Matter.Bodies.fromVertices(x, y, [verticies], {
        restitution: 0.8,
        render: {
          sprite: {
            texture: 'assets/icons/eighth_note.svg',
            xScale: 0.25,
            yScale: 0.25
          }
        }
      }, true);
    }

    Matter.World.add(world, body);
  }



  getIconStyle(index: number) {
    if (!this.rectangle) return {};

    const iconSize = 32;
    const spacing = this.rectangle.width / 5;
    const left = this.rectangle.x + spacing * (index + 1) - iconSize / 2;
    const top = this.rectangle.y + this.rectangle.height / 2 - iconSize / 2;

    return {
      top: `${top}px`,
      left: `${left}px`,
      width: `${iconSize}px`,
      height: `${iconSize}px`,
      position: 'absolute'
    };
  }

  onResize = () => {
    this.render.canvas.width = window.innerWidth;
    this.render.canvas.height = window.innerHeight;
    this.render.options.width = window.innerWidth;
    this.render.options.height = window.innerHeight;

    Matter.World.clear(this.engine.world, false);

    requestAnimationFrame(() => this.setupScene());
  };

  ngOnDestroy(): void {
    Matter.Render.stop(this.render);
    Matter.World.clear(this.engine.world, false);
    Matter.Engine.clear(this.engine);
    this.render.canvas.remove();
    this.render.textures = {};

    if (this.spawnIntervalId) {
      clearInterval(this.spawnIntervalId);
    }
  }
}
