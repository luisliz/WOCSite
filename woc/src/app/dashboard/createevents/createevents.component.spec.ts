import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateeventsComponent} from './createevents.component';

describe('CreateeventsComponent', () => {
    let component: CreateeventsComponent;
    let fixture: ComponentFixture<CreateeventsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateeventsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateeventsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
