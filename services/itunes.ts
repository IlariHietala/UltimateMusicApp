// Vastaa iTunesin hakurajapinnan kutsumisesta
// Palauttaa kappalelistan (Track-tyyppisenä)

import { Track } from '../types';

// iTunes Search API palauttaa raakamuotoisen datan
type ITunesRaw = {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName?: string;
  previewUrl?: string;
  artworkUrl100?: string;
};

// API-vastaus sisältää resultCount + results[]
type ITunesResponse = {
  resultCount: number;
  results: ITunesRaw[];
};

// Hakufunktio, jota käytetään App.tsx:ssä
export async function searchITunesTracks(term: string): Promise<Track[]> {
  const params = new URLSearchParams({
    term,          // hakusana
    entity: 'song',// haetaan vain kappaleita
    limit: '25',   // max 25 tulosta
  });

  const url = `https://itunes.apple.com/search?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('iTunes-haku epäonnistui');
  }

  const json = (await res.json()) as ITunesResponse;

  // Muutetaan tulos omaan Track-tyyppiin
  return (json.results ?? []).map((r) => ({
    trackId: r.trackId,
    trackName: r.trackName,
    artistName: r.artistName,
    collectionName: r.collectionName,
    previewUrl: r.previewUrl,
    artworkUrl100: r.artworkUrl100,
  }));
}
