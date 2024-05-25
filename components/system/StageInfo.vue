<template>
  <div class="bg-white px-4 py-5 sm:px-6 border-2 border-gray-200 rounded-lg shadow-md">
    <div class="flex space-x-3">
      <div class="flex-shrink-0">
        <ShareIcon :class="`h-5 w-5 ${_stage?.sharing ? 'text-green-500' : 'text-red-500'}`" />
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-sm font-semibold text-gray-900">
          <NuxtLink v-if="_stage?.userCreated?.id" :to="`/home/user/${_stage?.userCreated?.id}`" class="hover:underline">
            {{ _stage?.userCreated?.name }}
          </NuxtLink>
        </p>
        <p class="text-sm text-gray-500">
          <a class="hover:underline">{{ toLocaleString(_stage?.createdAt) }}</a>
        </p>
      </div>

      <div v-if="stage?.id" class="flex flex-shrink-0 self-center">
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton class="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
              <EllipsisVerticalIcon class="h-7 w-7" aria-hidden="true" />
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div class="py-1">
                <MenuItem v-for="option in options" v-slot="{ active }" :key="option.label" :disabled="!!option?.disabled">
                  <a :class="[!option?.disabled && active && 'bg-gray-100 text-gray-900', 'flex px-4 py-2 text-sm cursor-pointer', !!option?.disabled ? 'text-gray-400' : 'text-gray-700']" @click="option?.onClick">
                    <component :is="option.icon" class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span>{{ option.label }}</span>
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>

    <div class="-px-4 pb-5 -opacity-25 sm:p-6 sm:pt-0">
      <div v-if="editable" class="text-center">
        <Input
          focus
          variant="textarea"
          rows="4"
          placeholder="descrição desta etapa"
          name="desc"
          type="textarea"
          :value="_stage.desc"
          :on-change="(value: string) => _stage.desc = value"
          autocomplete="off"
        />

        <div class="mt-6 flex items-center justify-center gap-x-6">
          <button class="text-sm font-semibold leading-6 text-gray-900" @click="$emit('cancel')">
            Cancelar
          </button>
          <Button
            has-icon
            :disabled="!!!_stage.desc"
            @click="onSaveDescStage"
          >
            Salvar <PencilIcon class="w-4" />
          </Button>
        </div>
      </div>

      <p v-else class="text-gray-600 mt-5">
        {{ _stage?.desc }}
      </p>
    </div>

    <div class="">
      <TimeLine :timeline="_stage?.timelines ?? []" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItem, MenuItems, } from "@headlessui/vue";
import { DocumentArrowUpIcon, ArchiveBoxArrowDownIcon, CalendarIcon, EllipsisVerticalIcon, ShareIcon, UsersIcon, PencilIcon, } from "@heroicons/vue/24/solid";
import Stage from "~/composables/domains/Stage";

const props = defineProps<{
  stage?: Stage;
  editable?: boolean;
  optionsDisable?: Array<"Compartilhamento" | "Editar" | "Enviar arquivos" | "Envolvidos" | "Eventos" | "Arquivar">;
}>();

const emit = defineEmits(["saveDesc", "editable", "cancel", "openShare"]);

onMounted(() => {
  if (props.stage) {
    _stage.value = props.stage;
  }
});

const _stage = ref(new Stage({ desc: "" }));
const isLoading = ref(false);
const context = useNuxtApp();

const options = [
  {
    label: "Compartilhamento",
    icon: ShareIcon,
    disabled: props.optionsDisable?.includes("Compartilhamento"),
    onClick: () => props.stage && emit("openShare", props.stage),
  },
  {
    label: "Editar",
    icon: PencilIcon,
    disabled: props.optionsDisable?.includes("Editar"),
    onClick: () => emit("editable", String(props?.stage?.id))
  },
  {
    label: "Enviar arquivos",
    disabled: props.optionsDisable?.includes("Enviar arquivos"),
    icon: DocumentArrowUpIcon,
    onClick: () => undefined
  },
  {
    label: "Envolvidos",
    disabled: props.optionsDisable?.includes("Envolvidos"),
    icon: UsersIcon,
    onClick: () => undefined
  },
  {
    label: "Eventos",
    disabled: props.optionsDisable?.includes("Eventos"),
    icon: CalendarIcon,
    onClick: () => undefined
  },
  {
    label: "Arquivar",
    disabled: props.optionsDisable?.includes("Arquivar"),
    icon: ArchiveBoxArrowDownIcon,
    onClick: () => undefined
  },
];

async function onSaveDescStage () {
  try {
    const desc = _stage.value.desc;

    isLoading.value = true;

    // update stage
    if (props.stage && context.$selectedProcess.value){
      const stage = context.$selectedProcess.value.getStageById(props.stage.id);

      if (stage){
        await stage.setPersist({ desc })
          .then(() => {
            stage.desc = desc;
            emit("cancel");
          });
      }
    } else { // new stage
      const processId = context.$selectedProcess.value?.id;
      const stage = new Stage({ desc });

      stage.userCreated = context.$getUserId();
      stage.processId = processId;
      await stage
        .persist()
        .then(() => {
          stage.createdAt = new Date();
          context.$selectedProcess.value?.addStage(stage);
          emit("cancel");
        });
    }

    if (context.$selectedProcess.value){
      context.$notifyProcess(context.$selectedProcess.value);
    }
  } catch (error) {
    console.error(error);

    context.$snackbar({
      type: "error",
      title: "Erro",
      text: "Ocorreu um erro na atualização de etapa"
    });
  }
}

</script>
