import { Optional } from "@angular/core";

export class Jeu {

    public id?: string;
    public nom?: string;
    public type: string;
    public age_max?: number;
    public age_min?: number;
    public duree?: string = "1h";
    public nb_joueurs_max?: number = 10;
    public nb_joueurs_min?: number = 2;


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
        this.type = (type) ? type : 'Enfant';
        this.age_max = age_max;
        this.age_min = age_min;
        this.duree = (duree) ? duree : "2h";
        this.nb_joueurs_max = (nb_joueurs_max) ? nb_joueurs_max : 10;
        this.nb_joueurs_min = (nb_joueurs_min) ? nb_joueurs_min : 2;
    }

}
