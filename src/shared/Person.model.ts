export class Person{
    constructor(public id: number, public parentIds: number[], public name: string){
        this.id = id;
        this.parentIds = parentIds;
        this.name = name;
    }
}