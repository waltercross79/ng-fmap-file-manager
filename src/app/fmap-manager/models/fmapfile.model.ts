export interface IFmapFile {
    id: number
    name: string
    receivedDate: Date
    processedDate: Date
    content: string
}

export class FmapFile implements IFmapFile {
    constructor(public name = '', public receivedDate = null, 
        public id = 0, public processedDate = null, public content = '') {
    }

    static buildFmapFile(fmapFile: IFmapFile) {
        return new FmapFile(fmapFile.name, fmapFile.receivedDate, fmapFile.id, fmapFile.processedDate, fmapFile.content);
    }
}