/**
 * A könyvek előnézetét, fejlécét reprezentálja, az APi hívás során érkezett adatok tárolására szolgál. keresés során a könyvekről ezkeóóeket az információkat kapjuk vissza
 */
export interface Header {
    /**
     * a könyv azonosítója, ami segítségével lekérdezhetjük az api-tól a könyv adatait
     */
    key?: string;
    /**
     *  a könyv címe
     */
    title?: string;
    /**
     * a könyv oldalainak száma
     */
    edition_count?: number;
    /**
     * első publikáció éve
     */
    first_publish_year?: number;
    /**
     * a könyv borítójának a képének az id-ja, ennek segítségével kérhetjük le API híváson keresztül a képet
     */
    cover_i?: number;
    /**
     *  az elérhető nyelvek
     */
    language?: string[];
    /**
     * a szerző(k) azonosítója
     */
    author_key?: string[];
    /**
     * a szerző(k) neve
     */
    author_name?: string[];
}