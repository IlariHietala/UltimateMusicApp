import { Track } from '../types';

// iTunes Search API: https://itunes.apple.com/search?term={term}&entity=song&limit=25
type ITunesRaw = {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName?: string;
  previewUrl?: string;
  artworkUrl100?: string;
};

type ITunesResponse = {
  resultCount: number;
  results: ITunesRaw[];
};

export async function searchITunesTracks(term: string): Promise<Track[]> {
  const params = new URLSearchParams({
    term,
    entity: 'song',
    limit: '25',
  });

  const url = `https://itunes.apple.com/search?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('iTunes-haku epäonnistui');
  }

  const json = (await res.json()) as ITunesResponse;

  return (json.results ?? []).map((r) => ({
    trackId: r.trackId,
    trackName: r.trackName,
    artistName: r.artistName,
    collectionName: r.collectionName,
    previewUrl: r.previewUrl,
    artworkUrl100: r.artworkUrl100,
  }));
}
