<template>
  <!-- <Popover class="-relative">
    <PopoverButton class="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
      <span><slot name="icon"/></span>
    </PopoverButton>

    <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
      <PopoverPanel class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4">
        <div class="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
          <slot name="content"/>
        </div>
      </PopoverPanel>
    </transition>
  </Popover> -->

  <div class="flex flex-shrink-0 self-center bg-white">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton class="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
          <slot name="icon"/>
          <!-- <span class="sr-only">Open options</span> -->
          <!-- <EllipsisVerticalIcon class="h-7 w-7" aria-hidden="true" /> -->
        </MenuButton>
      </div>

      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <slot name="content" />
      </transition>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems, } from "@headlessui/vue";
import { EllipsisVerticalIcon, } from "@heroicons/vue/20/solid";
import { Popover, PopoverButton, PopoverPanel, } from "@headlessui/vue";
// import { ChevronDownIcon, } from "@heroicons/vue/20/solid";

const solutions = [
  { name: "Analytics", href: "#" },
  { name: "Engagement", href: "#" },
  { name: "Security", href: "#" },
  { name: "Integrations", href: "#" },
  { name: "Automations", href: "#" },
  { name: "Reports", href: "#" },
];

</script>