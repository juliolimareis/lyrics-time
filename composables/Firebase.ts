import type { User } from "firebase/auth";
import { collection, getDocs, query, orderBy, addDoc, setDoc, doc, getDoc, serverTimestamp, } from "firebase/firestore";

export class Firebase {
  db = useFirebase().db;

  async getLyrics () {
    const lyrics = [] as Lyric[];

    const userRef = collection(this.db, "lyrics");
    const q = query(userRef, orderBy("title", "asc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      lyrics.push({ ...doc.data(), id: doc.id } as Lyric);
    });

    return lyrics;
  }

  async getLyricById(id: string) {
    const snap = await getDoc(doc(this.db, "lyrics", id));

    if (snap.exists()) {
      return { ...snap.data(), id: snap.id } as Lyric;
    }

    return undefined;
  }

  async addLyric(lyric: Lyric, user: User) {
    const lyricsRef = collection(this.db, "lyrics");

    const docRef = await addDoc(lyricsRef, { ...lyric, createdAt: serverTimestamp(), createdBy: { id: user.uid, email: user.email, name: user.displayName } });

    return docRef.id;
  }

  async setLyric(lyric: Lyric, user: User) {
    const lyricsRef = collection(this.db, "lyrics");

    if (lyric.id) {
      const toUpdate = { ...lyric };

      delete toUpdate.id;
      await setDoc(doc(lyricsRef, lyric.id), { ...toUpdate, updatedAt: serverTimestamp(), editedBy: { id: user.uid, email: user.email, name: user.displayName } }, { merge: true });
    }
  }

}
