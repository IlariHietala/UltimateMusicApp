// Sovelluksen ulkoasun tyylit eriytettynä yhteen tiedostoon
// Käytetään React Nativen StyleSheet-olion kautta

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Sovelluksen juurikontti
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#0B0B0F', // tumma tausta
  },

  // Otsikko "iTunes-haku"
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 12,
  },

  // Hakupalkin riviasettelu
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  // Tekstikenttä hakuun
  input: {
    flex: 1,
    backgroundColor: '#1B1B21',
    color: 'white',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },

  // Hakunappi
  searchButton: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 8,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: '600',
  },

  // Latausindikaattorin keskitys
  loaderWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Listan alaosan padding
  listContent: {
    paddingBottom: 24,
  },

  // Teksti jos lista on tyhjä
  emptyText: {
    color: '#B8B8C6',
    textAlign: 'center',
    marginTop: 32,
  },

  // Kappalekortti
  card: {
    backgroundColor: '#14141A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Kansikuva
  cover: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#23232A',
  },

  // Kappaleen tekstiosuus
  cardInfo: {
    flex: 1,
    marginRight: 8,
  },
  trackTitle: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  trackSubtitle: {
    color: '#B8B8C6',
    marginTop: 2,
  },

  // Toimintonappien rivi
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonPrimary: {
    backgroundColor: '#22C55E', // vihreä (Play)
  },
  buttonSecondary: {
    backgroundColor: '#EF4444', // punainen (Stop)
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: '#22C55E',
    marginLeft: 10,
  },
  buttonOutlineText: {
    color: '#22C55E',
    fontWeight: '600',
  },

  // Esikuuntelun progress bar
  progressWrap: { flex: 1 },
  progressBarBg: {
    height: 6,
    backgroundColor: '#2A2A33',
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 8,
  },
  progressBarFill: {
    height: 6,
    backgroundColor: '#22C55E',
  },

  // Ajat (0:00 – 0:30)
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  timeText: {
    color: '#B8B8C6',
    fontVariant: ['tabular-nums'],
    fontSize: 12,
  },
});
