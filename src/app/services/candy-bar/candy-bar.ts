import { inject, Service } from '@angular/core';
import { Combo } from '../combo';
import { ComboCategory } from '../combo-category';

@Service()
export class CandyBar {
  private _comboCategoryService = inject(ComboCategory);
  private _comboService = inject(Combo);

  async getGroupedCombos(): Promise<any[]> {
    const [categories, combos] = await Promise.all([
      this._comboCategoryService.getList(),
      this._comboService.getListWithItems(),
    ]);

    return categories
      .sort((a, b) => a.display_order - b.display_order)
      .map((category) => ({
        category,
        combos: combos.filter((c) => c.combo_category_id === category.id),
      }));
  }
}
