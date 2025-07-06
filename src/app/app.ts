import { RouterOutlet } from '@angular/router';
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
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private engine = Matter.Engine.create();
  private render!: Matter.Render;
  private runner = Matter.Runner.create();
  private spawnIntervalId: any;

  circle?: { x: number; y: number; radius: number };
  rectangle?: { x: number; y: number; width: number; height: number };
  triangle?: { x: number; y: number; width: number; height: number };

  icons = [
    { src: 'assets/icons/linkedin.svg', href: 'https://www.linkedin.com/in/marshall-lanning/' },
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
    const world = this.engine.world;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const isSmallScreen = width < 900;

    const sizeRef = Math.min(width, height);
    const radius = Math.max(80, Math.min(200, sizeRef * 0.25));
    const centerX = width / 2;
    const centerY = height * (isSmallScreen ? 0.45 : 0.5); // slight shift up on mobile

    const circle = this.getCircle(centerX, centerY, radius);
    const rectangle = this.getRectangle(centerX, centerY, radius);
    const triangle = this.getTriangle(centerX, centerY, radius);

    Matter.World.add(world, [circle, rectangle, triangle]);

    this.startContinuousSpawning();

    this.cdr.detectChanges();
  }

  getCircle(centerX: number, centerY: number, radius: number): Matter.Body {
    const circle = Matter.Bodies.circle(centerX, centerY, radius / 2, {
      isStatic: true,
      render: {
        fillStyle: 'rgba(255,0,0,0.2)', // translucent red
        //strokeStyle: 'red',
        lineWidth: 2
      }
    });
    this.circle = { x: centerX, y: centerY, radius: radius / 2 };
    return circle;
  }

  getRectangle(centerX: number, centerY: number, radius: number): Matter.Body {
    const rectWidth = radius * 1.5;
    const rectHeight = radius * 0.25;
    const rectY = centerY + radius * 0.75;
    const rectangle = Matter.Bodies.rectangle(centerX, rectY, rectWidth, rectHeight, {
      isStatic: true,
      render: {
        fillStyle: 'rgba(0,255,0,0.2)', // translucent green
        //strokeStyle: 'green',
        lineWidth: 2
      }
    });

    this.rectangle = {
      x: centerX - rectWidth / 2,
      y: rectY - rectHeight / 2,
      width: rectWidth,
      height: rectHeight
    };

    return rectangle
  }

  getTriangle(centerX: number, centerY: number, radius: number): Matter.Body {
    const triangleHeight = radius * 2;
    const triangle = Matter.Bodies.fromVertices(
      centerX,
      centerY + triangleHeight * 0.2,
      [[
        { x: 0, y: -radius },
        { x: -radius * 1.5, y: triangleHeight },
        { x: radius * 1.5, y: triangleHeight }
      ]],
      {
        isStatic: true,
        render: {
          fillStyle: 'transparent',
          //strokeStyle: 'blue',
          lineWidth: 2
        }
      },
      true
    );
    
    this.triangle = {
      x: triangle.bounds.min.x,
      y: triangle.bounds.min.y,
      width: triangle.bounds.max.x - triangle.bounds.min.x,
      height: triangle.bounds.max.y - triangle.bounds.min.y
    };

    return triangle;
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

    const choice = Math.floor(Math.random() * 4);
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

    const iconCount = this.icons.length;
    const spacing = this.rectangle.width / (iconCount + 1);

    // Base icon size as a proportion of rectangle height
    const proportionalSize = this.rectangle.height * 0.6;

    // Clamp to min/max size in pixels
    const iconSize = Math.max(24, Math.min(48, proportionalSize));

    const left = this.rectangle.x + spacing * (index + 1) - iconSize / 2;
    const top = this.rectangle.y + (this.rectangle.height - iconSize) / 2;

    return {
      top: `${top}px`,
      left: `${left}px`,
      width: `${iconSize}px`,
      height: `${iconSize}px`,
      position: 'absolute'
    };
  }

  getNameStyle() {
    if (!this.triangle) return {};

    // OR even better if triangle object includes `bounds`:
    const top = this.triangle.y + this.triangle.height + 16;

    return {
      position: 'absolute',
      top: `${top}px`,
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: 'clamp(15px, 5vw, 50px)',
      fontWeight: 600,
      color: 'white',
      textAlign: 'center',
      zIndex: 20,
      pointerEvents: 'none'
    };
  }

  getSubNameStyle() {
    if (!this.triangle) return {};

    // OR even better if triangle object includes `bounds`:
    const top = this.triangle.y + this.triangle.height + 75;

    return {
      position: 'absolute',
      top: `${top}px`,
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: 'clamp(10px, 2vw, 25px)',
      fontWeight: 400,
      color: 'white',
      textAlign: 'center',
      zIndex: 20,
      pointerEvents: 'none'
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

export default App;