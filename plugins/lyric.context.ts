export default defineNuxtPlugin(() => {
  const lyrics = useState<Lyric[]>(() => []);

  return {
    provide: {
      lyrics
    }
  }
});