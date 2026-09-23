export const TextareaPreset = {
  root: {
    background: '#1D1D1D',
    borderColor: '#252527',
    borderRadius: '12px',
    paddingX: '16px',
    paddingY: '18px',
    invalidBorderColor: '#FE1D3B',
    hoverBorderColor: '#252527',
  },
  css: () => `
    .p-textarea {
      font-size: 14px;
      line-height: 20px;
      min-height: 144px;

      max-height: 240px;
    }
  `,
};
