import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditeventsComponent} from './editevents.component';

describe('EditeventsComponent', () => {
    let component: EditeventsComponent;
    let fixture: ComponentFixture<EditeventsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditeventsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditeventsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
