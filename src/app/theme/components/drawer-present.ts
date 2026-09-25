export const DrawerPreset = {
  root: {
    background: '#151517',
    borderColor: 'red',
  },
  header: {
    padding: '14px 24px',
  },
  content: {
    padding: '14px 24px 48px 24px',
  },
  footer: {
    padding: '24px',
  },
  css: () => `
    .p-drawer {
      min-width: 432px;
      border: 0;
      border-left: 1px solid #353535;
    }
  `,
};
