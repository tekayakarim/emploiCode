import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifClasseComponent } from './modif-classe.component';

describe('ModifClasseComponent', () => {
  let component: ModifClasseComponent;
  let fixture: ComponentFixture<ModifClasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifClasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
