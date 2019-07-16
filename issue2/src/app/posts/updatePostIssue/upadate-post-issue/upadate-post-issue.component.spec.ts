import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpadatePostIssueComponent } from './upadate-post-issue.component';

describe('UpadatePostIssueComponent', () => {
  let component: UpadatePostIssueComponent;
  let fixture: ComponentFixture<UpadatePostIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpadatePostIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpadatePostIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
