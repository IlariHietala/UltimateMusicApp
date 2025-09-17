import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 70,
    backgroundColor: '#0B0B0F',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 12,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#1B1B21',
    color: 'white',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  searchButton: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 8   // korvaa gap
  },
  searchButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  loaderWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyText: {
    color: '#B8B8C6',
    textAlign: 'center',
    marginTop: 32,
  },
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
  cover: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#23232A',
  },
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
    backgroundColor: '#22C55E',
  },
  buttonSecondary: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: '#22C55E',
    marginLeft: 10     // korvaa gap toiselle napille
  },
  buttonOutlineText: {
    color: '#22C55E',
    fontWeight: '600',
  },
  progressWrap: {
    flex: 1,
  },
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
