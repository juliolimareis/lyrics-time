<template>
  <div class="grid grid-rows-1 sm:grid-flow-col sm:grid-rows-1 md:grid-cols-1 md:grid-flow-col bg-gray-100">
    <div class="space-y-3">
      <p class="text-gray-700">
        <b>Detalhes da empresa</b>
      </p>

      <div class="grid grid-cols-1 space-y-3">
        <InfoLabel label="razão social">
          {{ company.socialName }}
        </InfoLabel>

        <InfoLabel label="nome fantasia">
          {{ company.fantasyName }}
        </InfoLabel>

        <InfoLabel label="cnpj">
          {{ company.cnpj }}
        </InfoLabel>

        <InfoLabel label="endereço">
          {{ showAddress() }}
        </InfoLabel>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 space-y-1">
        <InfoLabel label="telefone">
          {{ company.tel }}
        </InfoLabel>

        <InfoLabel label="whatsapp">
          {{ company.whatsapp }} {{ company.tel }}
        </InfoLabel>

        <InfoLabel label="email">
          {{ company.email }}
        </InfoLabel>

        <InfoLabel label="site">
          <a v-if="company.siteUrl" class="text-primary-600" :href="company.siteUrl" target="_blank">{{ company.siteUrl }}</a>
        </InfoLabel>
      </div>

      <InfoLabel label="contato do responsável da empresa">
        {{ company.email }}
      </InfoLabel>

      <InfoLabel label="atividades econômicas da empresa">
        <div v-for="service in company.service" :key="service.id">
          {{ service?.desc?.toLocaleUpperCase() }}
        </div>
      </InfoLabel>

      <p class="text-gray-700">
        <b>Se você já consumiu produtos ou serviços com esta empresa você pode avaliá-la.</b>
      </p>

      <!-- <CompanyValuation /> -->

      <p class="text-sm text-gray-600">
        APRESENTAÇÃO DA EMPRESA:
      </p>

      <!-- Description -->
      <div class="grid md:grid-flow-col grid-rows-1 gap-4">
        <div class="w-32 h-32">
          <!-- <img :src="exemple" :alt="company.socialName"> -->
          <div class="w-full h-full bg-primary-800"></div>
        </div>

        <div class="md:col-span-1">
          {{ company.desc }}
        </div>
      </div>

    </div>

    <!-- <div class="mt-5">
      <EvaluationCard />
    </div> -->
  </div>

</template>

<script lang="ts" setup>
// import exemple from '~/assets/images/company_logo_exemple.jpg';

const props = defineProps<{
  company: Company;
}>();

function showAddress(){
  return `${props.company.street}, ${props.company.number}, ${props.company.neighborhood}, ${props.company.complement && String(props.company.complement).concat(",")} ${props.company.city}, ${props.company.uf}, ${props.company.code}`;
}

</script>

<style>

</style>