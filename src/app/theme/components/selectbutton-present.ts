export const SelectButtonPreset = {
  root: {
    borderRadius: '12px',
  },
  css: () => `
    .p-selectbutton {
      background: #1D1D1D;
    }
      
    .p-selectbutton .p-togglebutton {
      background: #1D1D1D;
      width: 100%;
      height: 56px;
      padding: 0;
      border: 0;
      border-radius: 12px;
    }

    .p-togglebutton.p-togglebutton-checked .p-togglebutton-content {
      background: #1D51FE;
      border-color: transparent;
    }
  `,
};
