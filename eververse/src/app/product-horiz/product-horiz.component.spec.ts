import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHorizComponent } from './product-horiz.component';

describe('ProductHorizComponent', () => {
  let component: ProductHorizComponent;
  let fixture: ComponentFixture<ProductHorizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductHorizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductHorizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
