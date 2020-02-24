import {TestBed, async, inject} from '@angular/core/testing';

import {ActivatedGuard} from './activated.guard';

describe('ActivatedGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ActivatedGuard]
        });
    });

    it('should ...', inject([ActivatedGuard], (guard: ActivatedGuard) => {
        expect(guard).toBeTruthy();
    }));
});
