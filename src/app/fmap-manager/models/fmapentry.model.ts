export interface IFmapEntry {
    permId: string
    paymentDate: Date
    fmap: number
    eligibilityCategory: string
    id: number
    screenshotDate: Date
    passedValidation: boolean
    originalValue: string
}

export class FmapEntry {
    constructor(public permId: string = '', public paymentDate: Date = null, 
        public fmap: number = 0.00, public eligibilityCategory: string = '',
        public id: number = 0, public screenshotDate: Date = null, 
        public passedValidation: boolean = false, public originalValue: string = '') {
    }

    static CreateFmapEntry(entry: IFmapEntry) {
        return new FmapEntry(entry.permId, entry.paymentDate, entry.fmap,
            entry.eligibilityCategory, entry.id, entry.screenshotDate, entry.passedValidation, entry.originalValue)
    }
}