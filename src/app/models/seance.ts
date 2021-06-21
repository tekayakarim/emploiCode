import { Modulee } from "./modulee";
import { User } from "./user";
import {Classe} from "./classe";
export class Seance {
    codeS:string;
    heureDeb:string;
    heureFin:string;
    date:string;
    type:string;
    jour:string;
    module:Modulee;
    enseignant:User;
    cl:Classe;
    numSalle:number;
}
