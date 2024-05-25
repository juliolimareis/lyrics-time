<template>
  <Modal :is-open="isOpen" :on-close="() => $emit('close')">
    <template #title>
      <div class="grid grid-cols-12">
        <p class="text-center">
          Compartilhamento
        </p>
      </div>
    </template>

    <template #body>
      <LoaderText v-if="isLoader">
        Carregando...
      </LoaderText>

      <div v-else>
        <div class="h-72">
          <autocomplete
            :items="usersShare"
            :filter-search="filterSearch"
            :display-option="displayOption"
            :on-selected="onSelected"
          />

          <TextList class="mt-4" :items="textList" :on-remove="onRemove" />
        </div>
      </div>
    </template>

    <template #footer>
      <div class="mt-6 flex items-center justify-center gap-x-6">
        <button class="text-sm font-semibold leading-6 text-gray-900" @click="$emit('close')">
          Voltar
        </button>
        <Button
          v-if="!showAddUser"
          class="bg-green-500"
          :is-loading="isLoader"
          @click="handleSave"
        >
          Salvar
        </Button>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { TextListItem, } from "~/components/TextList.vue";
import Stage from "~/composables/domains/Stage";

const props = defineProps<{
  isOpen?: boolean;
  stage: Stage;
}>();

const context = useNuxtApp();

const emit = defineEmits(["close"]);

const users = ref<UserI[]>([]);
const usersShare = ref<UserI[]>([]);
const textList = ref<TextListItem<UserI>[]>([]);
const showAddUser = ref(false);
const isLoader = ref(true);

function handleSave(){
  const usersList = [] as UserId[];

  textList.value.forEach((tl) => {
    if (tl.id){
      usersList.push({ id: tl.id, phone: tl.item.phone, name: tl.item.name });
    }
  });

  onSaveUsersShare(usersList);
}

function filterSearch(items: UserI[], value: string) {
  const normalizedValue = normalizeSpecialChars(value?.toLowerCase());

  return items.filter(item => (
    normalizeSpecialChars(String(item.name).toLowerCase()).includes(normalizedValue) ||
      String(item.name).includes(value?.toLowerCase())
  ));
}

const displayOption = (item: UserI) => [item.name, " (", item.phone, ")"].join("");

function onSelected(item: UserI) {
  if (!textList.value.find(u => u.id === item.id)){
    addTextList(item);
  }
}

function onRemove(item: TextListItem){
  textList.value = textList.value.filter(u => u.id !== item.id);

  const findIndex = users.value.findIndex(u => u.id === item.id);

  if (findIndex !== -1){
    usersShare.value.push(users.value[findIndex]);
    users.value.splice(findIndex, 1);
  }
}

function addTextList(item: UserI){
  textList.value.push({ id: String(item.id), label: [item.name, " (", item.phone, ")"].join(""), item });

  const findIndex = usersShare.value.findIndex(u => u.id === item.id);

  if (findIndex !== -1){
    if (!users.value.find(u => u?.id === item?.id)){
      users.value.push(users.value[findIndex]);
    }

    usersShare.value.splice(findIndex, 1);
  }
}

async function onSaveUsersShare(usersShareId: UserId[]){
  isLoader.value = true;

  const stage = context.$selectedProcess.value?.getStageById(String(props?.stage?.id));

  if (stage){
    stage.usersShareId = usersShareId;
    stage.sharingPhones = usersShareId.filter(u => u.phone).map(u => String(u.phone));
    await stage.setPersist({ usersShareId, sharingPhones: stage.sharingPhones });
  }

  emit("close");
}

onMounted(async () => {
  const firebase = new Firebase();

  users.value = await firebase.getUsersByUsersId(context.$selectedProcess?.value?.usersId);

  users.value.forEach((user) => {
    if (props.stage.usersShareId?.find(us => us.id === user.id)){
      addTextList({ phone: user.phone, name: user.name, id: user.id });
    } else {
      usersShare.value.push(user);
    }
  });

  isLoader.value = false;
});

</script>
