// Vastaa kappaleen avaamisesta Spotifyssä
// Jos Spotify-app on asennettu, avaa sen suoraan
// Muuten avaa selaimen Spotify-hakuun

import { Linking } from 'react-native';
import { Track } from '../types';

export function openInSpotify(track: Track) {
  // Luodaan hakukysely "kappale + artisti"
  const parts = [track.trackName, track.artistName].filter(Boolean);
  const query = encodeURIComponent(parts.join(' '));

  // Selaimessa toimiva URL
  const url = `https://open.spotify.com/search/${query}`;

  Linking.openURL(url).catch(() => {
    // Jos selainlinkki ei onnistu, yritetään avata Spotify deep link
    const fallback = `spotify:search:${query}`;
    Linking.openURL(fallback).catch(() => {});
  });
}
