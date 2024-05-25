<template>
  <div class="relative flex flex-col text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
    <nav v-if="items.length" class="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
      <div v-for="item in items" :key="item.id" role="button" class="text-gray-700 flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900" @click="onClick && onClick(item)">
        {{ item.label }}
        <div class="grid ml-auto place-items-center justify-self-end">
          <button
            class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            @click="onRemove && onRemove(item)"
          >
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-red-500">
              X
            </span>
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts" setup>

export interface TextListItem<T = object> {
  id: string;
  label: string;
  item: T
}

defineProps<{
  items: TextListItem[];
  onClick?:(item: TextListItem) => void;
  onRemove?: (item: TextListItem) => void;
}>();

</script>
