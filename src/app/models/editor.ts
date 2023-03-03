import { Optional } from "@angular/core";
import { Jeu } from "./jeu";

export class Editor {

    public id?: string;
    public nom?: string;
    public nom_societe?: string;
    public contact?: string;
    public jeux?: Jeu[];

    public constructor(
        @Optional() id?: string,
        @Optional() nom?: string,
        @Optional() nom_societe?: string,
        @Optional() contact?: string,
        @Optional() jeux?: Jeu[]
    ) {
        this.id = id;
        this.nom = nom;
        this.nom_societe = nom_societe;
        this.contact = contact;
        this.jeux = jeux;
    }

}
