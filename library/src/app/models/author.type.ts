/**
 *  A szerzők adatainak eltárolására használt osztály interface-e
 */

export interface Author {
    /**
     * a szerző azonosítója, amellyel azonosítani lehet API hívásnál
     */
    key?: string;
    /**
     * a szerző titulusa 
     * */
    title?: string;
    /**
     *  A szerző neve
     */
    name?: string;
    /**
     * A szerző képeinek tömbje, ha több képe van akkor mindegyik benne van itt
     */
    photos?: number[];
    /**
     * A szerző linkjeit tároló kollekció
     */
    links?: Link[];
    /**
     * A szerző alternatív nevei
     */
    alternate_names?: string[];
    /**
     * A szerző születési dátuma
     */
    birth_date?: string;
    /**
     * A szerző wikipedia oldalára mutató link
     */
    wikipedia?: string;
    /**
     * A szerző halálának dátuma
     */
    death_date?: string;
    /**
     * A szerző munkásságának leírása
     */
    bio?: string | { type?: string; value?: string };
}
/**
 * A szerző linkjeinek iterface-e
 */
export interface Link {
    url?: string;
    /**
     * a neve az oldalnak, ahova mutat az url
     */
    title?: string;
}