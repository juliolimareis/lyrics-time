<template>
  <div>
    <!-- <label v-if="label" class="text-left block text-sm font-medium leading-6 text-gray-900 mb-2">
      {{ label }}
    </label> -->

    <component
      :is="variant ?? 'input'"
      :id="id"
      :ref="_onRef"
      :name="name"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :class="`
        block
        w-full
        rounded-md
        border-0
        py-1.5
        text-gray-900
        shadow-sm
        ring-1
        ring-inset
        ring-gray-300
        placeholder:text-gray-400
        focus:ring-2
        focus:ring-inset
        focus:ring-primary-600
        sm:text-sm
        sm:leading-6
        ${isError || _isError && 'border-2 focus:ring-red-400 border-red-400 focus:border-red-400'}
        ${_validated && 'border-2 focus:ring-[#42d392] border-[#42d392]'}
        ${disabled ? 'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200' : ''}
      `"
      :autofocus="focus"
      :value="value"
      :disabled="disabled"

      :rows="rows"
      @input="_onChange($event)"

      @blur="_onBlur($event)"
    />

    <p
      v-if="showHelperText || _showHelperText"
      class="text-sm mt-1"
      :class="{[helperTextClass ?? 'text-red-500']: isError || _isError}"
    >
      {{ helperText }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUpdated, } from "vue";

const _value = ref("");
const _isError = ref(false);
const _showHelperText = ref(false);
const _validated = ref(false);

export declare interface InputProps {
  variant?: string;
  id?: string;
  name?: string;
  value?: string | null;
  label?: string;
  type?: string;
  placeholder?: string;
  isError?: boolean;
  disabled?: boolean;
  showHelperText?: boolean;
  helperText?: string;
  validateWithOnBlur?: boolean;
  validateOnUpdate?: boolean;
  blockPaste?: boolean;
  blockCopy?: boolean;
  helperTextClass?: string;
  rows: string;
  autocomplete?: string;
  focus?: boolean;
  onBlur?:(value: string, e: FocusEvent) => void;
  onChange?:(value: string, event: Event) => void;
  validate?: (value: string) => boolean;
  onValidate?: (isError: boolean) => void;
  validateWhen?: (value: string) => boolean;
}

const props = defineProps<InputProps>();

onMounted(() => {
  _value.value = props?.value ?? "";
});

function _onValidate () {
  if (props.onValidate && props.validate) {
    let error = true;

    if (props.validate(_value.value)) {
      error = false;
    }

    props?.onValidate(error);

    _validated.value = !error;
    _showHelperText.value = error;
    _isError.value = error;
  }
}

function _onChange (event: Event) {
  _value.value = (event.target as HTMLInputElement).value;

  if (props?.onChange) {
    props?.onChange((event.target as HTMLInputElement).value, event);

    if (props.onValidate) {
      if (props.validateWhen && props.validateWhen(_value.value)) {
        _onValidate();
      }
    }
  }
}

function _onBlur (event: FocusEvent) {
  if (props.onBlur) {
    props?.onBlur((event.target as HTMLInputElement).value, event);
  }
  if (props.validateWithOnBlur) {
    _onValidate();
  }
}

function _onRef (el: HTMLElement) {
  if (el && props.blockPaste) { el.onpaste = (e: Event) => e.preventDefault(); }
  if (el && props.blockCopy) { el.oncopy = (e: Event) => e.preventDefault(); }
  if (el && props.blockCopy) { el.oncut = (e: Event) => e.preventDefault(); }
}

onUpdated(() => {
  if (props.validateOnUpdate) {
    _onValidate();
  }
});

</script>
