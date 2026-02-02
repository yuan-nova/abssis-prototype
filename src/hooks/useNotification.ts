import { useSnackbar } from 'notistack';

export function useNotification() {
  const { enqueueSnackbar } = useSnackbar();

  return {
    showSuccess: (message: string) =>
      enqueueSnackbar(message, { variant: 'success', autoHideDuration: 3000 }),
    showError: (message: string) =>
      enqueueSnackbar(message, { variant: 'error', autoHideDuration: 4000 }),
    showInfo: (message: string) =>
      enqueueSnackbar(message, { variant: 'info', autoHideDuration: 3000 }),
    showWarning: (message: string) =>
      enqueueSnackbar(message, { variant: 'warning', autoHideDuration: 3500 }),
  };
}
