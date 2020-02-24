import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CategoryEventsComponentComponent} from './category-events.component';

describe('CategoryEventsComponentComponent', () => {
    let component: CategoryEventsComponentComponent;
    let fixture: ComponentFixture<CategoryEventsComponentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CategoryEventsComponentComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryEventsComponentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
