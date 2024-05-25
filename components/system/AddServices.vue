<template>
  <div>
    <Text v-if="showTitle" class="ml-5 text-center" type="title" variant="span">Serviços</Text>

    <Button
      class="w-fit float-right"
      has-icon
      @click="onSave"
      :disabled="newServices.length === 0 && !isLoader"
    >
      Salvar
    </Button>

    <Loader v-if="isLoader" class="m-auto mt-20" size="md"/>

    <div class="mt-10" v-else>
      <button
        class="w-fit fixed bottom-0 right-0 mr-10 mb-3 rounded-full bg-primary-600 text-white p-3"
        @click="addService"
      >
        <PlusIcon class="w-8"/>
      </button>

      <p
        v-if="services.length === 0 && newServices.length === 0"
        class="mt-10 text-center text-sm text-gray-600 bg-primary-200 rounded-sm p-4 transform"
      >
        Não há serviços cadastrados.
      </p>

      <div v-else>
        <div
          v-for="service in newServices"
          class="m-4"
          :key="service"
        >
          <Input
            label="Novo Serviço"
            :value="String(service.desc)"
            :on-change="(value: string) => service.desc = value"
          />
        </div>

        <div
          v-for="service in services"
          class="m-4"
          :key="service.id"
        >
          <Input
            :value="String(service.desc)"
            :disabled="true"
          />
        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: ["auth"] });

import { PlusIcon, } from "@heroicons/vue/24/solid";

defineProps({
  showTitle: {
    type: Boolean,
    default: true
  }
});

const { fetchAllServices, dispatchService } = useCompany();
const services = ref<Service[]>([]);
const newServices = ref<CreateService[]>([]);
const isLoader = ref(true);

function addService(){
  newServices.value.push({ desc: "" });
}

function getServices(){
  fetchAllServices()
    .then(res => {
      services.value = res.data;
    }).finally(() => isLoader.value = false);
}

function onSave(){
  isLoader.value = true;
  newServices.value = newServices.value.filter((s: CreateService) => s.desc);

  dispatchService(newServices.value).then(res => {
    services.value = [...res.data, ...services.value];
    newServices.value = [];
  }).finally(() => isLoader.value = false);
}

onMounted(() => {
  getServices();
});

</script>
