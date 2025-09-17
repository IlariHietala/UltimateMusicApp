import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { searchITunesTracks } from './services/itunes';
import { openInSpotify } from './utils/spotify';
import { styles } from './styles';
import type { Track } from './types';

// Apufunktio millisekunneista mm:ss
function msToClock(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) ms = 0;
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function App() {
  // Käyttäjän hakusana
  const [query, setQuery] = useState<string>('');
  // Hakutulokset
  const [tracks, setTracks] = useState<Track[]>([]);
  // Lataustila indikaattorille
  const [loading, setLoading] = useState<boolean>(false);

  // Kappale jota toistetaan (trackId)
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);
  // Lataustila yksittäiselle kappaleelle (esikuuntelun käynnistyksessä)
  const [loadingTrackId, setLoadingTrackId] = useState<number | null>(null);

  // Esikuuntelun etenemisen tilat
  const [positionMs, setPositionMs] = useState<number>(0);
  const [durationMs, setDurationMs] = useState<number>(30000); // oletus 30s

  // Äänisoittimen referenssi
  const soundRef = useRef<Audio.Sound | null>(null);

  // Siivotaan mahdollinen ääni kun komponentti unmountataan
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {});
      }
    };
  }, []);

  // Haku iTunesista
  const handleSearch = async () => {
    const term = query.trim();
    if (!term) return;

    setLoading(true);
    await stopPreview(); // Pysäytetään mahdollinen aiempi soitto
    try {
      const results = await searchITunesTracks(term);
      setTracks(results);
    } catch {
      Alert.alert('Virhe', 'Haussa tapahtui virhe. Yritä uudelleen.');
    } finally {
      setLoading(false);
    }
  };

  // Lopettaa esikuuntelun
  const stopPreview = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    } catch {
    }
    setPlayingTrackId(null);
    setPositionMs(0);
  };

  // Käynnistää esikuuntelun tai pysäyttää jos sama kappale soi
  const playPreview = async (track: Track) => {
    // Jos sama kappale soi, toimitaan toggle-tyyppisesti
    if (playingTrackId === track.trackId) {
      await stopPreview();
      return;
    }

    // Pysäytä mahdollinen aiempi soitto
    await stopPreview();

    // Jos esikuuntelu ei ole mahdollinen, ilmoitetaan siitä käyttäjälle
    if (!track.previewUrl) {
      Alert.alert('Ei esikuuntelua', 'Tälle kappaleelle ei ole saatavilla 30s preview’ta iTunesista.');
      return;
    }

    // Yritetään ladata ja toistaa esikuuntelu
    try {
      setLoadingTrackId(track.trackId); // näytetään spinneri napissa
      // Luodaan uusi Sound-olio ja käynnistetään toisto
      const { sound } = await Audio.Sound.createAsync(
        { uri: track.previewUrl },
        { shouldPlay: true, progressUpdateIntervalMillis: 200 }
      );
      soundRef.current = sound;
      setPlayingTrackId(track.trackId);

      // Haetaan alkutila (pituus, nykyinen kohta)
      const initial = await sound.getStatusAsync();
      if ('isLoaded' in initial && initial.isLoaded) {
        setDurationMs(initial.durationMillis ?? 30000);
        setPositionMs(initial.positionMillis ?? 0);
      } else {
        setDurationMs(30000);
        setPositionMs(0);
      }

      // Päivitetään tilaa kun soitto etenee
      sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
        if ('isLoaded' in status && status.isLoaded) {
          setPositionMs(status.positionMillis ?? 0);
          if (status.durationMillis) setDurationMs(status.durationMillis);

          // Kun soitto loppuu, pysäytetään
          if (status.didJustFinish) {
            stopPreview();
          }
        }
      });
    } catch {
      Alert.alert('Toistovirhe', 'Esikuuntelua ei voitu käynnistää.');
      setPlayingTrackId(null);
    } finally {
      setLoadingTrackId(null);
    }
  };

  // Renderöi yksittäisen kappaleen kortin
  const renderItem = ({ item }: { item: Track }) => {
    const isPlaying = playingTrackId === item.trackId;
    const isLoadingThis = loadingTrackId === item.trackId;

    // Progress-laskenta vain aktiiviselle kappaleelle
    const progress =
      isPlaying && durationMs > 0 ? Math.min(1, positionMs / durationMs) : 0;

    const leftTime = isPlaying ? msToClock(positionMs) : '0:00';
    const rightTime = msToClock(durationMs || 30000);

    //Kappaleiden renderöinti
    return (
      <View style={styles.card}>
        <View style={styles.cardRow}>
          <Image
            source={{ uri: item.artworkUrl100 || '' }}
            style={styles.cover}
            resizeMode="cover"
          />
          <View style={styles.cardInfo}>
            <Text style={styles.trackTitle} numberOfLines={1}>
              {item.trackName || 'Tuntematon kappale'}
            </Text>
            <Text style={styles.trackSubtitle} numberOfLines={1}>
              {item.artistName || ''} {item.collectionName ? `• ${item.collectionName}` : ''}
            </Text>

            {/* Progress bar + ajat */}
            <View style={styles.progressWrap}>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${(progress * 100).toFixed(2)}%` as `${number}%` },
                  ]}
                />
              </View>
              <View style={styles.timeRow}>
                <Text style={styles.timeText}>{leftTime}</Text>
                <Text style={styles.timeText}>{rightTime}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.button, isPlaying ? styles.buttonSecondary : styles.buttonPrimary]}
            onPress={() => playPreview(item)}
            disabled={isLoadingThis}
          >
            {isLoadingThis ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : isPlaying ? (
              <Ionicons name="stop" size={18} color="#FFFFFF" />
            ) : (
              <Ionicons name="play" size={18} color="#FFFFFF" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonOutline]}
            onPress={() => openInSpotify(item)}
          >
            <Text style={styles.buttonOutlineText}>Toista Spotifyssä</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  //Sovelluksen päärenderöinti
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>iTunes haku</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Hae kappaletta tai artistia…"
          placeholderTextColor={'#ffffffff'}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Hae</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={tracks}
          keyExtractor={(item) => String(item.trackId)}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={styles.emptyText}>Tee haku yläpuolella olevassa hakukentässä ja kappaleet näkyvät tässä.</Text>}
        />
      )}
    </SafeAreaView>
  );
}
