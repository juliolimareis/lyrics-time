<template>
  <div class="text-center bg-black text-white w-screen h-screen">
    <template v-if="lyrics.length">
      <NuxtLink class="w-fit m-auto" v-for="lyric in lyrics" :key="lyric.id" :to="'/lyric/' + lyric.id">
        <p class="mb-5 text-xl font-bold text-center p-2 border-2 border-gray-200 rounded-md">
          {{ lyric.title }} - <span class="font-normal">{{ lyric.artist }}</span>
        </p>
      </NuxtLink>
    </template>

    <template v-else>
      <p class="text-center">Carregando letras...</p>
    </template>
  </div>
</template>

<script lang="ts" setup>
  const api = useLyric();

  const lyrics = ref<Lyric[]>([]);

  onMounted(() => {
    api.fetchAll()
      .then(res => {
        lyrics.value = res.data;
      });
  });
</script>
