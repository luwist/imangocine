export const ToastPreset = {
  root: {
    borderRadius: '8px',
  },
  content: {
    padding: '8px 12px',
  },
  text: {
    gap: '0',
  },
  detail: {
    fontSize: '14px',
  },
  summary: {
    fontSize: '14px',
  },
  colorScheme: {
    dark: {
      info: {
        background: '#1D1D1D',
        borderColor: '#1D1D1D',
      },
    },
  },
  css: () => `
    .p-toast-message-icon,
    .p-toast-close-icon {
      display: none !important;
    }

    .p-toast-message-text {
      width: auto !important;
    }

    .p-toast-message {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
    }
  `,
};
