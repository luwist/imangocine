export const ButtonPreset = {
  colorScheme: {
    dark: {
      root: {
        height: '48px',
        paddingX: '24px',
        paddingY: '18px',
        borderRadius: '50px',
        label: {
          fontWeight: '600',
        },
        primary: {
          background: '#1D51FE',
          hoverBackground: '#1842d0',
          activeBackground: '#1538b8',
          color: '#FFFFFF',
          borderColor: '#1D51FE',
          hoverBorderColor: '#1842d0',
          activeBorderColor: '#1538b8',
        },
        lg: {
          fontSize: '14px',
        },
      },
    },
  },
  css: () => `
    .p-button {
      font-size: 14px;
      line-height: 20px;
      border: none;
      text-decoration: none;
    }
        
    .p-button:not(:disabled):hover {
      border: none;
      color: #FFFFFF;
    }
  `,
};
