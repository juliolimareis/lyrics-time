import { UserCredential, browserLocalPersistence, signInWithEmailAndPassword, } from "firebase/auth";

export default defineNuxtPlugin(() => {
  const { auth } = useFirebase();
  const errorCode = useState(() => "");
  const user = useState<UserCredential["user"] | undefined>(() => undefined);

  async function fetchLogin () {
    await auth.setPersistence(browserLocalPersistence);

    if (auth.currentUser) {
      user.value = auth.currentUser;
    }
  }

  async function onLogin (email: string, password: string) {
    await auth.setPersistence(browserLocalPersistence);

    await signInWithEmailAndPassword(auth, email, password)
       
      .then(async (userCredential) => {
        user.value = userCredential.user;
      })
      .catch((error) => {
        errorCode.value = (String(error.code));
      });
  }

  function logout () {
    user.value = undefined;

    return auth.signOut();
  }

  function getUserId(){
    return {
      id: user.value?.uid,
      name: user.value?.displayName
    };
  }

  return {
    provide: {
      fetchLogin,
      onLogin,
      logout,
      user,
      errorCode,
      getUserId
    }
  };
});
