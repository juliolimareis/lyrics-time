<template>
  <div class="text-center bg-black text-white w-screen h-screen">
    <div v-if="lyric" class="fixed ml-2 grid grid-rows-4">
      <NuxtLink to="/lyrics" class="col-span-1 text-center pt-6 mb-2">
        <svg class="w-6 h-6 fill-green-500" role="button" viewBox="0 0 24 24" aria-hidden="true" tabindex="-1"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>
      </NuxtLink>

      <NuxtLink :to="'/edit?lyric=' + lyric.id" title="Edit" class="col-span-1 text-white focus:outline-none focus:ring-2 focus:ring-opacity-75">
        <PencilSquareIcon class="w-6 h-6 text-green-500"/>
      </NuxtLink>
    </div>

    <template v-if="lyric">
      <Transition :duration="100" appear>
        <div class="w-full h-1 bg-green-500 rounded-full" :style="{ width: `${sizeBar}%`, transition: '0.8s' }"/>
      </Transition>
  
      <div class="grid grid-cols-12 w-fit m-auto mt-2 px-3">
        <p class="col-span-7 mb-5 text-xl font-bold mt-3 text-center">
          {{ lyric.title }} 
          <br>
          <span class="font-normal">
            {{ lyric.artist }}
          </span>
        </p>
      
        <div class="col-span-4 flex items-center justify-center ml-2">
          <div class="-col-span-4">
            <!-- PLAY -->
            <button 
              v-if="player === 'pause'"
              class="w-11 h-11 bg-green-500 hover:bg-green-600 text-white font-bold py-[10px] px-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
              @click="start"
              @keydown="start"
            >
              <svg class="h-6 w-6 -inline-block ml-1 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z" />
              </svg>
            </button>
        
            <!-- PAUSE -->
            <button
              v-if="player === 'play'"
              class="w-11 h-11 blob green bg-green-500 hover:bg-green-600 text-white font-bold py-[10px] px-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
              @click="pause"
            >
              <svg class="h-6 w-6 inline-block mb-1 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            </button>
          </div>
          
          <!-- PREVIOUS -->
          <div class="ml-3 flex items-baseline justify-between">
            <div class="mr-3">
              <svg :class="['w-5 h-5', findNextStep('previous') ? 'fill-green-500 cursor-pointer' : 'fill-gray-400']" @click="change('previous')" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
                <g>
                  <g>
                    <path d="M490.861,2.971c-6.485-3.84-14.507-3.968-21.141-0.32L53.336,231.664V21.338c0-11.776-9.557-21.333-21.333-21.333
                      S10.669,9.562,10.669,21.338v469.333c0,11.776,9.557,21.333,21.333,21.333s21.333-9.557,21.333-21.333V280.346L469.72,509.36
                      c3.221,1.771,6.741,2.645,10.283,2.645c3.755,0,7.531-1.003,10.859-2.965c6.507-3.84,10.475-10.837,10.475-18.368V21.338
                      C501.336,13.786,497.368,6.81,490.861,2.971z"/>
                  </g>
                </g>
              </svg>
            </div>

            <!-- NEXT -->
            <div>
              <svg :class="['w-5 h-5', findNextStep('next') ? 'fill-green-500 cursor-pointer' : 'fill-gray-400']" @click="change('next')" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
                <g>
                  <g>
                    <path d="M480,0c-11.776,0-21.333,9.557-21.333,21.333v210.325L42.283,2.645c-6.613-3.627-14.656-3.52-21.141,0.32
                      c-6.485,3.84-10.475,10.816-10.475,18.368v469.333c0,7.552,3.989,14.528,10.475,18.368C24.491,511.019,28.245,512,32,512
                      c3.541,0,7.083-0.875,10.283-2.645l416.384-229.013v210.325c0,11.776,9.557,21.333,21.333,21.333s21.333-9.557,21.333-21.333
                      V21.333C501.333,9.557,491.776,0,480,0z"/>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div class="text-center w-fit m-auto mt-5 px-5">
        <p class="mb-5 text-justify text-2xl racking-wide" v-html="currentStep?.html"/>
      </div>
    </template>

    <template v-else>
      <p>Carregando ...</p>
    </template>
  </div>

</template>

<script lang="ts" setup>
import { PencilSquareIcon, } from "@heroicons/vue/24/outline";

const router = useRouter()
const route = useRoute();
const context = useNuxtApp();

const currentStep = ref<Step>();
const currentPart = ref<number>(0);
const sizeBar = ref(0);
const player = ref<"play" | "pause">("pause");
const timeCount = ref(0);
const notFound = ref(false);
const lyric = ref<Lyric>();

function pause(){
  player.value = "pause";
}

function stop(){
  player.value = "pause";
  timeCount.value = 0;
  sizeBar.value = 0;
}

function play(){
  player.value = "play";
}

function keydown(e: any){
  if (e.code === 'Space') {
    if(player.value === "pause"){
      start();
    }else{
      pause();
    }
  }else if (e.code === 'ArrowLeft') {
    change("previous");
  }else if (e.code === 'ArrowRight') {
    change("next");
  }
}

function change(action: "next" | "previous"){
  stop();
  const nextStep = findNextStep(action);

  if(nextStep){
    currentStep.value = nextStep;
    router.push({ query: { part: currentStep.value?.id } })
  }
}

function findNextStep(action: "next" | "previous"){
  let findIndex = lyric.value.steps.findIndex(s => s.id === currentStep.value.id);
  const actionSum = action === "next" ? 1 : -1;
  const changedStep = lyric.value.steps[findIndex + actionSum];

  if(findIndex !== -1 && changedStep){
    return changedStep;
  }else{
    return undefined;
  }
}

async function start() {
  play();
  const startIndex = lyric.value?.steps.findIndex(s => s.id === currentStep.value?.id) ?? 0;
  const playConfig = lyric.value?.steps.filter((_, i) => i >= startIndex);

  for (const stepConfig of playConfig) {
    if(player.value === "play"){
      const timeout = stepConfig.time * 1000;
      const incrementSizeBar = (1/stepConfig.time) * 100;
      
      currentStep.value = stepConfig;

      await new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          if(timeCount.value >= timeout){
            sizeBar.value = 0;
            timeCount.value = 0;
            clearInterval(interval);
            resolve();
          }else if(player.value === "play"){
            sizeBar.value < 100 && (sizeBar.value += incrementSizeBar);
            timeCount.value += 1000;
          }else{
            clearInterval(interval);
          }
        }, 1000);
      });
    }else{
      break;
    }
  }
}

onMounted(() => {
  currentPart.value = Number(route.query.part) ?? 0;

  const findLyric = context.$lyrics.value.find(lyric => lyric.id === route?.params?.id)

  if(findLyric) {
    lyric.value = findLyric;

    if(currentPart.value){
      const findStep = lyric?.value?.steps.find(s => s.id === currentPart.value);

      if(findStep){
        currentStep.value = findStep;
        return;
      }
    }
      
    currentStep.value = lyric.value?.steps[0];
  }else{
    notFound.value = true;
  };

  document.addEventListener('keydown', keydown);
});
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  .blobs-container {
    display: flex;
  }

  .blob {
    background: black;
    border-radius: 50%;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
    /* margin: 10px;
    height: 20px;
    width: 20px; */
    transform: scale(1);
    animation: pulse-black 2s infinite;
  }

  @keyframes pulse-black {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }
    
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
    
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }

  .blob.green {
    background: #22c55e;
    box-shadow: rgba(0 0 0 0 #22c55e);
    animation: pulse-green 2s infinite;
  }

  @keyframes pulse-green {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(51, 217, 178, 0.7);
    }
    
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(51, 217, 178, 0);
    }
    
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(51, 217, 178, 0);
    }
  }
</style>