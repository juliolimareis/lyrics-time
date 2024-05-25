<template>
  <div class="-fixed -top-16 -w-72">
    <Combobox v-model="selected">
      <div class="relative mt-1">
        <div
          class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
        >
          <div class="flex flex-1">
            <div class="relative w-full">
              <MagnifyingGlassIcon class="pointer-events-none absolute inset-y-0 ml-2 left-0 h-full w-5 text-gray-500" aria-hidden="true" />
              <!-- <Input id="search-field" class="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0  focus:ring-0 sm:text-sm" placeholder="pesquisar..." type="search" name="search" /> -->
              <ComboboxInput
                class="w-full block ring-gray-300 shadow-sm border-0 ring-1 ring-inset py-2 pl-8 pr-10 text-sm sm:leading-6 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-primary-600 "
                :display-value="displayValue"
                @change="setQuery($event.target.value)"
              />
            </div>
          </div>
          <!-- <ComboboxInput
            class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            :displayValue="displayValue"
            @change="setQuery($event.target.value)"
          /> -->
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leave-from="opacity-100"
          leave-to="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute z-[500] mt-1 -max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <div
              v-if="filteredItem.length === 0 && query !== ''"
              class="relative cursor-default select-none px-4 py-2 text-gray-700"
            >
              Sem resultados.
            </div>

            <ComboboxOption
              v-for="(item, i) in filteredItem"
              :key="i"
              v-slot="{ selected, active }"
              class="z-50"
              as="template"
              :value="item"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ displayOption(item) }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-teal-600': !active }"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon, MagnifyingGlassIcon, } from "@heroicons/vue/20/solid";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AutocompleteProps<T = any> {
  items: T[];
  filterSearch:(items: T[], value: string) => T[]; // filtro de opções que é disparado quando digitado
  displayOption: (item: T) => string; // string de como vai aparecer as opções
  displayValue?: (item: T) => string; // string de como vai aparecer no input depois da seleção
  onSelected?: (item: T) => void;
}

const props = defineProps<AutocompleteProps>();

const selected = ref();
const query = ref("");

const filteredItem = computed(() => {
  if (query.value){
    return props.filterSearch(props.items, query.value);
  }

  return props.items.filter((_, i) => i < 5);
});

function setQuery(value: string){
  query.value = value;
}

watch(selected, (newSelected) => {
  if (props.onSelected) {
    props.onSelected(newSelected);
  }
});

</script>
