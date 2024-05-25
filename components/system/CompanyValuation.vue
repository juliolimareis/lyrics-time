<template>
  <fieldset class="grid grid-cols-1 md:grid-cols-5">
    <div class="space-x-2">
      <input type="radio" name="radio-excellent" value="5" v-model="selectedOption"/>
      <label class="mb-1" for="radio-excellent">Excelente</label>
    </div>

    <div class="space-x-2">
      <input type="radio" name="radio-great" value="4" v-model="selectedOption"/>
      <label for="radio-great">Ótimo</label>
    </div>

    <div class="space-x-2">
      <input type="radio" name="radio-good" value="3" v-model="selectedOption"/>
      <label for="adio-good">Bom</label>
    </div>

    <div class="space-x-2">
      <input type="radio" name="radio-poor" value="2" v-model="selectedOption"/>
      <label for="radio-poor">Ruim</label>
    </div>

    <div class="space-x-2">
      <input type="radio" name="radio-terrible" value="1" v-model="selectedOption"/>
      <label for="radio-terrible">Terrível</label>
    </div>
  </fieldset>
</template>

<script lang="ts" setup>
const selectedOption = ref();

</script>