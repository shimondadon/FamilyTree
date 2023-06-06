export interface FamilyNodeInterface{
    names: string[];
    parent?: FamilyNodeInterface;
    children: FamilyNodeInterface[];
}