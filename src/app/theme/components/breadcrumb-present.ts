export const BreadcrumbPreset = {
  root: {
    gap: '12px',
    background: '#151517',
  },
  item: {
    color: '#888888',
    icon: {
      color: '#888888',
    },
  },
  css: () => `
    .p-breadcrumb-item-label {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
    }
  `,
};
