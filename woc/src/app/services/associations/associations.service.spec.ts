import {TestBed} from '@angular/core/testing';

import {AssociationsService} from './associations.service';

describe('AssociationsService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: AssociationsService = TestBed.get(AssociationsService);
        expect(service).toBeTruthy();
    });
});
