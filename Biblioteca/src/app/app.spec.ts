import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges(); // Necesario para que las Signals se rendericen
    const compiled = fixture.nativeElement as HTMLElement;
    // Ahora el título es "Biblioteca" (por el signal que definiste)
    expect(compiled.querySelector('h1')?.textContent).toContain('Biblioteca');
  });
});
