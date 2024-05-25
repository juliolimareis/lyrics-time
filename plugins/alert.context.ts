import { SnackbarProps, } from "~/components/Snackbar.vue";

export default defineNuxtPlugin(() => {
  const showSnackbar = useState<boolean>("showSnackbar", () => false);
  const snackbarInfo = useState<SnackbarProps>("snackbar", () => ({
    type: "success",
    title: "title",
    text: "text",
    timeout: 3,
  }));

  function snackbar (snackbarProps: SnackbarProps) {
    snackbarInfo.value = snackbarProps;
    showSnackbar.value = true;

    setTimeout(() => {
      showSnackbar.value = false;
    }, 5000);
  }

  return {
    provide: {
      snackbarInfo,
      showSnackbar,
      snackbar,
    }
  };
});
