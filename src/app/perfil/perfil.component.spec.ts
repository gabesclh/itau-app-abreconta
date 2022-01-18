import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { PerfilComponent } from './perfil.component';
import { PerfilService } from './service/perfil.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;
  let service: jasmine.SpyObj<PerfilService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        SharedModule,
        MaterialModule,
        HttpClientTestingModule,
      ],
      declarations: [PerfilComponent],
      providers: [
        {
          provide: PerfilService,
          usevalue: jasmine.createSpyObj('PerfilService', [
            'getUser',
            'postUser',
            'putUser',
            'deleUser',
          ])
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
