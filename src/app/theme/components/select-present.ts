export const SelectPreset = {
  root: {
    background: '#1D1D1D',
    borderColor: '#252527',
    hoverBorderColor: '#252527',
    borderRadius: '12px',
    color: '#FFFFFF',
    placeholderColor: '#FFFFFF',
    paddingX: '16px',
    paddingY: '18px',
    invalidBorderColor: '#FE1D3B',
  },
  overlay: {
    background: '#1D1D1D',
    borderColor: '#252527',
    borderRadius: '12px',
  },
  list: {
    gap: '0',
    padding: '8px',
  },
  option: {
    borderRadius: '12px',
    padding: '14px',
    focusBackground: '#242424',
  },
  css: () => `
    .p-select-label {
      font-size: 14px;
    }

    .p-select-option {
      font-size: 14px;
    }

    .p-select-dropdown-icon {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .p-select-dropdown {
      width: 52px;
      height: 56px;
    }

    .p-select-overlay {
      margin-top: 8px;
      margin-bottom: 8px;
    }
  `,
};
