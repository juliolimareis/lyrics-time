<template>
  <Snackbar
    v-if="context.$showSnackbar?.value"
    :type="context.$snackbarInfo?.value.type"
    :title="context.$snackbarInfo?.value.title"
    :text="context.$snackbarInfo?.value.text"
  />

  <main v-if="isLoading" class="relative isolate min-h-full text-green-500 bg-black w-screen h-screen">
    <div class="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
      <!-- <img class="h-36 m-auto md:h-36" :src="Logo" alt="GM Logo"> -->
      
      <h1 class="text-2xl mb-5 text-green-500 -font-bold tracking-tight -text-white sm:text-4xl">
        Lyrics Time
      </h1>

      <img class="h-36 m-auto md:h-36" :src="Logo" alt="GM Logo">
      
      <p class="mt-4 text-base text-green-500 sm:mt-6">
        "Descubra a trilha sonora da sua vida, uma letra de cada vez."
      </p>
      
      <div class="mt-10 flex justify-center text-green-500">
        <LoaderText size="lg">
          Aguarde um instante ...
        </LoaderText>
      </div>
    </div>
  </main>

  <div class="text-green-500 bg-black w-screen h-screen"v-else>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import Logo from "~/assets/images/logo.png";
import Cover from "~/assets/images/cover.png";
import { Firebase } from "~/composables/Firebase"

const route = useRoute();
const router = useRouter();
const context = useNuxtApp();
const isLoading = ref(true);

useHead({ title: "Loading ..." });

onMounted(() => {
  context.$fetchLogin()
    .then(async () => {
      if (context.$user.value) {
        await new Firebase()
          .getLyrics()
          .then((lyrics) => {
            context.$lyrics.value = lyrics;
          });

        if (route.path === "/") {
          router.replace("/lyrics");
        }
      } else {
        router.replace("/");
        isLoading.value = false;
      }
    }).finally(() => isLoading.value = false);
});

</script>
