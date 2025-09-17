import { Linking } from 'react-native';
import { Track } from '../types';

export function openInSpotify(track: Track) {
  const parts = [track.trackName, track.artistName].filter(Boolean);
  const query = encodeURIComponent(parts.join(' '));
  const url = `https://open.spotify.com/search/${query}`;

  Linking.openURL(url).catch(() => {
    const fallback = `spotify:search:${query}`;
    Linking.openURL(fallback).catch(() => {});
  });
}
