<template>
  <LoaderText v-if="isLoading">
    Carregando dados do usuário ...
  </LoaderText>

  <div v-else class="mt-2 px-3">
    <div class="space-y-12 md:max-w-lg md:m-auto">
      <div class="pb-12">
        <div class="mt-3 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
          <div v-if="showFields.includes('name')" class="sm:col-span-3">
            <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Nome</label>
            <div class="mt-2">
              <Input
                name="name"
                type="text"
                placeholder="nome"
                validate-with-on-blur
                :value="formData.name"
                :on-change="(value: string) => formData.name = value"
                :on-validate="(isError: boolean) => formDataValidate.name = isError"
                :validate="(value: string) => strMin(value, 2)"
                :helper-text="'Nome deve conter pelo menos 2 caracteres'"
                :helper-text-class="'text-white bg-orange-400 p-1 rounded-md'"
                :validate-on-update="isValideAll"
                autocomplete="off"
                :disabled="isLoading"
              />
            </div>
          </div>

          <div v-if="showFields.includes('phone')" class="sm:col-span-3">
            <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Whatsapp</label>
            <div class="mt-2">
              <Input
                name="phone"
                type="text"
                placeholder="Whatsapp"
                validate-with-on-blur
                :value="formData.phone"
                :on-change="(value: string) => formData.phone = value"
                :on-validate="(isError: boolean) => formDataValidate.phone = isError"
                :validate="(value: string) => useValidations('phone', value)"
                :helper-text="'número inválido'"
                :helper-text-class="'text-white bg-orange-400 p-1 rounded-md'"
                :validate-on-update="isValideAll"
                autocomplete="off"
                :disabled="isLoading"
              />
            </div>
          </div>

          <div v-if="showFields.includes('email')" class="sm:col-span-3">
            <label for="about" class="block text-sm font-medium leading-6 text-gray-900">E-mail</label>
            <div class="mt-2">
              <Input
                name="email"
                type="email"
                placeholder="E-mail"
                validate-with-on-blur
                :value="formData.email"
                :on-change="(value: string) => formData.email = value"
                :on-validate="(isError: boolean) => formDataValidate.email = isError"
                :validate="(value: string) => value && useValidations('email', value)"
                :helper-text="'e-mail inválido'"
                :helper-text-class="'text-white bg-orange-400 p-1 rounded-md'"
                :validate-on-update="isValideAll"
                autocomplete="off"
                :disabled="isLoading"
              />
            </div>
          </div>

          <div v-if="showFields.includes('permission')" class="sm:col-span-3">
            <label for="group" class="block text-sm font-medium leading-6 text-gray-900">Grupos</label>
            <div class="mt-2">
              <select name="group" autocomplete="Cliente" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                <option>Cliente</option>
                <option>Colaborador</option>
                <option>Administrador</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-center gap-x-6">
      <button class="text-sm font-semibold leading-6 text-gray-900" @click="onCancel">
        Cancelar
      </button>
      <Button :is-loading="loader" @click="onSend">
        Salvar
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>

type Field = "email" | "phone" | "permission" | "name"

const props = defineProps<{
  id?: string;
  loader?: boolean;
  showFields: Array<Field>;
  onSubmit?:(user: UserI) => void;
  onCancel?: () => void;
}>();

const isLoading = ref(false);
const isValideAll = ref(false);

const formData = reactive({
  name: "",
  email: "",
  phone: ""
});

const formDataValidate = reactive({
  name: false,
  email: false,
  phone: false,
});

function onSend(){
  isValideAll.value = true;

  if (!validateFormData(formDataValidate)) { return; }

  props.onSubmit && props.onSubmit(formData);
}

onMounted(async () => {
  if (props.id){
    isLoading.value = true;
    const user = new User({ id: props.id });

    await user.fetch();

    formData.name = user.name ?? "";
    formData.phone = user.phone ?? "";
    formData.email = user.email ?? "";
    isLoading.value = false;
  }
});

</script>
