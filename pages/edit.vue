<template>
  <div v-if="notFound" class="bg-black w-screen text-green-500">
    <p class="text-green-500 text-2xl text-center mt-3">
      Music not found
      <br>
      <NuxtLink to="/lyrics" title="go to home" class="text-center underline">
        Go home
      </NuxtLink>
    </p>
  </div>

  <div v-else class="bg-black p-3">
    <div class="fixed">
      <div class="flex justify-center gap-10 w-screen bg-black opacity-90">
        <NuxtLink to="/lyrics" title="go to home" class="w-fit text-center -col-span-3">
          <svg class="w-7 h-7 fill-green-500" role="button" viewBox="0 0 24 24" aria-hidden="true" tabindex="-1"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>
        </NuxtLink>
  
        <button @click="onSave" title="Salve" class="-col-span-3 w-fit text-white focus:outline-none focus:ring-2 focus:ring-opacity-75">
          <CheckIcon class="w-7 h-7 text-green-500"/>
        </button>
  
        <button @click="add" title="Add step" class="-col-span-3 w-fit text-white focus:outline-none focus:ring-2 focus:ring-opacity-75">
          <PlusIcon class="w-7 h-7 text-green-500"/>
        </button>
        
        <NuxtLink v-if="lyricId" :to="'/lyric/' + lyricId" title="test lyric" class="-col-span-3 w-fit text-white focus:outline-none focus:ring-2 focus:ring-opacity-75">
          <PlayCircleIcon class="w-7 h-7 text-green-500"/>
        </NuxtLink>
      </div>
    </div>

    <div class="max-w-sm mx-auto mt-8 bg-black">
      <div class="mb-5">
        <label
          for="base-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Music
        </label>
        <input
          type="text"
          placeholder="music name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          v-model="lyric.title"
        />
      </div>

      <div class="mb-5">
        <label
          for="base-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Artist
        </label>
        <input
          type="text"
          placeholder="artist name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          v-model="lyric.artist"
        />
      </div>

      <template v-for="(setup, i) in lyric.steps" :key="setup.id">
        <div class="mb-5 grid grid-cols-12">
          <div class="col-span-11">
            <label
              for="base-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Time
            </label>
            <input
              type="number"
              pattern="[0-9]*"
              inputmode="numeric"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              v-model="setup.time"
            />
          </div>

          <div class="col-span-1">
            <button @click="remove(i)" class="text-white mt-8 ml-4  focus:outline-none focus:ring-2 focus:ring-opacity-75">
              <TrashIcon class="w-4 h-4 text-red-400"/>
            </button>
          </div>

        </div>
  
        <div class="mb-5">
          <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Part {{ setup.id }}</label>
          <textarea
            class="p-2 block w-full text-gray-900 border border-green-300 rounded-lg bg-gray-50 text-base focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            v-model="setup.html" placeholder="lyrics HTML here..."
            rows="5"
          />
          <div class="p-2 bg-black text-justify text-white border-[1px] mt-2 rounded border-gray-400 min-h-10" v-html="setup.html" />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PlusIcon, TrashIcon, CheckIcon, PlayCircleIcon, } from "@heroicons/vue/24/outline";

useHead({ title: "Edit" });

const route = useRoute();

const context = useNuxtApp();
const lyricId = ref<string>();
const api = useLyric();
const notFound = ref(false);
const firebase = new Firebase();
const lyric = ref<Lyric>({
  title: "",
  artist: "",
  steps: [{
    id: 1,
    html: "",
    time: 20
  }]
});

function add(){
  lyric.value.steps.push({
    id: lyric.value.steps.length + 1,
    html: "",
    time: 20
  });
}

function remove(index: number){
  lyric.value.steps.splice(index, 1);  
}

async function onSave(){
  if(lyricId.value && context.$user.value){
    await firebase.setLyric(lyric.value, context.$user.value);
    const index = context.$lyrics.value.findIndex(l => l.id === lyric.value.id);

    if(index !== -1){
      context.$lyrics.value.splice(index, 1);
    }
  }else if(!lyricId.value && context.$user.value){
    lyricId.value = await firebase.addLyric(lyric.value);
  }

  context.$lyrics.value.push(lyric.value);
}

onMounted(() => {
  lyricId.value = route?.query?.lyric as string;

  if(lyricId.value){
    const findLyric = context.$lyrics.value.find(lyric => lyric.id === lyricId.value)
    
    if(findLyric){
      lyric.value = findLyric;
      useHead({ title: "Edit - " + lyric.value.title });

    }else{
      notFound.value = true;
    }
  }
});
</script>

<style>
body {
  background-color: black;
  height: 100%;
}
</style>