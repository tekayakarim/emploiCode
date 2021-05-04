import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifSeanceComponent } from './modif-seance.component';

describe('ModifSeanceComponent', () => {
  let component: ModifSeanceComponent;
  let fixture: ComponentFixture<ModifSeanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifSeanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifSeanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
