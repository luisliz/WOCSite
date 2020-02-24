import {TestBed, async, inject} from '@angular/core/testing';

import {AssocGuard} from './assoc.guard';

describe('AssocGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AssocGuard]
        });
    });

    it('should ...', inject([AssocGuard], (guard: AssocGuard) => {
        expect(guard).toBeTruthy();
    }));
});
