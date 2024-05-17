<template>
  <div id="app" class="text-center bg-black text-white">
    <!-- <Transition :duration="100" appear> -->
      <div class="w-full h-1 bg-green-500 rounded-full" :style="{ width: `${sizeBar}%`, transition: '0.8s' }"></div>
    <!-- </Transition> -->
    
    <div class="grid grid-cols-12 w-fit m-auto mt-2 px-3">
      <p class="col-span-10 mb-5 text-xl font-bold mt-3 text-center">{{ config.title }} - {{ config.artist }}</p>
    
      <div class="col-span-2 flex items-center justify-center">
        <!-- PLAY -->
        <button 
          v-if="player === 'pause'"
          class="w-11 h-11 bg-green-500 hover:bg-green-600 text-white font-bold py-[10px] px-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
          @click="start"
        >
          <svg class="h-6 w-6 -inline-block ml-1 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z" />
          </svg>
        </button>
    
        <!-- PAUSE -->
        <button
          v-if="player === 'play'"
          class="w-11 h-11 blob green bg-green-500 hover:bg-green-600 text-white font-bold py-[10px] px-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
          @click="player = 'pause'"
        >
          <svg class="h-6 w-6 inline-block mb-1 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        </button>
      </div>
    </div>
    
    <div class="text-center w-fit m-auto mt-5">
      <p class="mb-5 text-justify text-2xl racking-wide" v-html="htmlLyric"></p>
    </div>
    </div>
</template>


<script lang="ts" setup>
  const step = ref();
  const htmlLyric = ref("");
  const sizeBar = ref(0)
  const player = ref("pause") // play | pause
  const config = ref({
    title: "21 Guns",
    artist: "Green Day",
    steps: [
      {
        id: 1,
        html: `
          Intro
        `,
        time: 20
      },
      {
        id: 2,
        html: `
          Do you know what's worth fighting for
          <br>
          When it's not worth dying for?
          <br>
          Does it take your breath away
          <br>
          And you feel yourself suffocating?
        `,
        time: 20
      },
      {
        id: 3,
        html: `
          Does the pain weigh out the pride
          <br>
          And you look for a place to hide?
          <br>
          Did someone break your heart inside?
          <br>
          You're in ruins
        `,
        time: 22
      },
      {
        id: 4,
        html: `
          1, 21 guns
          <br>
          Lay down your arms and give up the fight
          <br>
          1, 21 guns
          <br>
          Throw up your arms into the sky
          <br>
          You and I
        `,
        time: 30
      },
    ]
  });

  async function start() {
    player.value = "play";
    const startIndex = config.value.steps.findIndex(s => s.id === step.value.id);
    const playConfig = config.value.steps.filter((_, i) => i >= startIndex);

    console.log(step.value.id, startIndex, playConfig);

    for (const stepConfig of playConfig) {
      let timeCount = 0;
      const timeout = stepConfig.time * 1000;
      const incrementSizeBar = (1/stepConfig.time) * 100;
      
      step.value = stepConfig;
      htmlLyric.value = stepConfig.html;

      await new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          if(timeCount >= timeout){
            sizeBar.value = 0;
            clearInterval(interval);
            resolve();
          }else if(player.value === "play"){
            sizeBar.value += incrementSizeBar;
            timeCount += 1000;
          }else{
            clearInterval(interval);
          }
        }, 1000);
      });
    }
  }

  onMounted(() => {
    step.value = config.value.steps[0];
    htmlLyric.value = step.value.html;
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




