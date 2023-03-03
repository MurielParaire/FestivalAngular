import { Optional } from "@angular/core";

export class Jeu {

    public id?: string;
    public nom?: string;
    public type: string;
    public age_max?: number;
    public age_min?: number;
    public duree?: string;
    public nb_joueurs_max?: number;
    public nb_joueurs_min?: number;


    public constructor(
        name: string,
        @Optional() id?: string,
        @Optional() type?: string,
        @Optional() age_max?: number,
        @Optional() age_min?: number,
        @Optional() duree?: string,
        @Optional() nb_joueurs_max?: number,
        @Optional() nb_joueurs_min?: number,
    ) {
        this.nom = name;
        this.id = id;
        this.type = (type) ? type : 'enfant';
        this.age_max = age_max;
        this.age_min = age_min;
        this.duree = duree;
        this.nb_joueurs_max = nb_joueurs_max;
        this.nb_joueurs_min = nb_joueurs_min;
    }

}
