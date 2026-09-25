import { definePreset, palette } from '@openng/optimus-ui-themes';
import Aura from '@openng/optimus-ui-themes/aura';
import {
  BreadcrumbPreset,
  ButtonPreset,
  DataTablePreset,
  DrawerPreset,
  InputTextPreset,
  SelectButtonPreset,
  SelectPreset,
  TextareaPreset,
} from './components';

export const CustomPresent = definePreset(Aura, {
  semantic: {
    primary: palette('#1D51FE'),
  },
  components: {
    button: ButtonPreset,
    breadcrumb: BreadcrumbPreset,
    drawer: DrawerPreset,
    inputtext: InputTextPreset,
    datatable: DataTablePreset,
    textarea: TextareaPreset,
    selectbutton: SelectButtonPreset,
    select: SelectPreset,
  },
});
