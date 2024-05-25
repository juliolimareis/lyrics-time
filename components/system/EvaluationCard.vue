<template>
  <div class="w-64 h-fit border-2 border-gray-400 rounded-lg px-3 py-2 pb-5">
    <h1 class="font-semibold text-gray-600">AVALIAÇÃO DA EMPRESA</h1>

    <div class="flex mt-2">
      <Star class="w-7 text-orange-500" is-active/>
      <Star class="w-7 text-orange-500" is-active/>
      <Star class="w-7 text-orange-500" is-active/>
      <Star class="w-7 text-orange-500" is-active/>
      <Star class="w-7 text-orange-500"/>
    </div>

    <legend class="text-sm mt-2 text-gray-700">300 Avaliações</legend>

    <div class="mt-4">
      <RatingBar label="Excelente" value="69"/>
    </div>
    <div class="mt-4">
      <RatingBar label="Ótimo" value="17"/>
    </div>
    <div class="mt-4">
      <RatingBar label="Boa" value="5"/>
    </div>
    <div class="mt-4">
      <RatingBar label="Ruim" value="3"/>
    </div>
    <div class="mt-4">
      <RatingBar label="Péssima" value="7"/>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>