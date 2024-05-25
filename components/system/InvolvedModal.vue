<template>
  <Modal :is-open="isOpen" :on-close="onClose">
    <template #title>
      <div class="grid grid-cols-12">
        <div v-if="showAddUser" class="col-span-12">
          <p class="text-center">
            Adicionar usuário
          </p>
        </div>
        <div v-else class="col-span-6">
          <p class="text-center">
            Envolvidos
          </p>
        </div>

        <div v-if="!showAddUser" class="col-span-6">
          <Button class="text-sm float-right md:mr-5" @click="showAddUser = true">
            Novo
          </Button>
        </div>
      </div>
    </template>
    <template #body>
      <LoaderText v-if="isLoading">
        Carregando...
      </LoaderText>

      <div v-else>
        <UserForm
          v-if="showAddUser"
          :show-fields="['name', 'phone']"
          :on-cancel="() => showAddUser = false"
          :on-submit="onCreateUser"
          :loader="loadingUserForm"
        />

        <div v-else class="h-72">
          <Autocomplete
            :items="allUsers"
            :filter-search="filterSearch"
            :display-option="displayOption"
            :on-selected="onSelected"
          />

          <TextList class="mt-4" :items="textList" :on-remove="onRemove" />
        </div>
      </div>
    </template>
    <template v-if="!showAddUser" #footer>
      <div class="mt-6 flex items-center justify-center gap-x-6">
        <button class="text-sm font-semibold leading-6 text-gray-900" @click="onClose">
          Voltar
        </button>
        <Button v-if="!showAddUser" class="bg-green-500" @click="handleSave">
          Salvar
        </Button>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { TextListItem, } from "~/components/TextList.vue";

const props = defineProps<{
  isOpen?: boolean;
  onSave?:(usersId: UserId[]) => void;
  onClose?: () => void;
}>();

const context = useNuxtApp();

const users = ref<UserI[]>([]);
const allUsers = ref<UserI[]>([]);
const textList = ref<TextListItem[]>([]);
const showAddUser = ref(false);
const loadingUserForm = ref(false);
const isLoading = ref(true);

function handleSave(){
  const userList = [] as UserId[];

  if (props.onSave){
    textList.value.forEach((tl) => {
      if (tl.id){
        userList.push({ id: tl.id });
      }
    });

    isLoading.value = true;
    props.onSave(userList);
  }
}

function filterSearch(items: UserI[], value: string) {
  const normalizedValue = normalizeSpecialChars(value?.toLowerCase());

  return items.filter(item => (
    normalizeSpecialChars(String(item.name).toLowerCase()).includes(normalizedValue) ||
      String(item.phone).includes(value?.toLowerCase())
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
    allUsers.value.push(users.value[findIndex]);
    users.value.splice(findIndex, 1);
  }
}

function addTextList(item: UserI){
  textList.value.push({ id: String(item.id), label: [item.name, " (", item.phone, ")"].join("") });

  const findIndex = allUsers.value.findIndex(u => u.id === item.id);

  if (findIndex !== -1){
    if (!users.value.find(u => u?.id === item?.id)){
      users.value.push(users.value[findIndex]);
    }

    allUsers.value.splice(findIndex, 1);
  }
}

async function onCreateUser(newUser: UserI){
  const user = new User(newUser);

  loadingUserForm.value = true;
  user.userCreated = context.$getUserId();
  await user.persist();
  allUsers.value.push(user.get());
  addTextList(user.get());
  showAddUser.value = false;
  loadingUserForm.value = false;
}

onMounted(async () => {
  const firebase = new Firebase();

  allUsers.value = await firebase.getUsers();

  users.value = allUsers.value.filter(u => context.$selectedProcess.value?.usersId?.find(ui => u.id === ui.id)) ?? [];
  users.value.forEach(u => addTextList(u));

  isLoading.value = false;
});

</script>
