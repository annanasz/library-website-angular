import { Header } from "./header.type";
/**
 * A teljes könyv objektum, amikor egy konkrét könyvet kérdezünk le, akkor ezeket az adatokat kapjuk vissza, valamint tartalmazza a fejlécet is 
 */
export interface Book {
    /**
     * a könyv fejléce
     */
    header?: Header;
    /**
     * a könyv leírása
     */
    description?: string | { type?: string; value?: string };
    /**
     * a könyv címe
     */
    title?: string;
    /**
     * a kömnyvben említett emberek
     */
    subject_places?: string[];
    /**
     * első publikáció éve
     */
    first_publish_date?: string;
    /**
     * a kömnyvben említett emberek
     */
    subject_people?: string[];
    /**
     * a könyv azonosítója, ami segítségével lekérdezhetjük az api-tól a könyv adatait
     */
    key?: string;
    /**
     * a könyv szerzőinek listája
     */
    authors?: Author[];
    /**
     *  a könyv témái
     */
    subjects?: string[];
    /**
     * a könyvben megjelenő történelmi idők
     */
    subject_times?: string[];
}

/**
 * a könyv szerzője
 */
export interface Author {
    author?: { key?: string }
}