// Määrittelee kappaleen tietorakenteen (Track)
// Tätä käytetään koko sovelluksessa tyyppiturvan varmistamiseksi

export type Track = {
  trackId: number;          // iTunesin yksilöllinen ID kappaleelle
  trackName: string;        // Kappaleen nimi
  artistName: string;       // Artistin nimi
  collectionName?: string;  // Albumin nimi (valinnainen)
  previewUrl?: string;      // 30 sekunnin esikuuntelun URL
  artworkUrl100?: string;   // Kansikuvan URL (100x100 px)
};