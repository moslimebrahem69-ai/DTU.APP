import { supabase } from './supabase';

export async function trackMaterialView(materialId: string): Promise<void> {
  try {
    const storageKey = 'dtu-viewed-materials';
    const raw = localStorage.getItem(storageKey);
    const viewedIds: string[] = raw ? (JSON.parse(raw) as string[]) : [];
    const isUnique = !viewedIds.includes(materialId);

    if (isUnique) {
      viewedIds.push(materialId);
      localStorage.setItem(storageKey, JSON.stringify(viewedIds));
    }

    const { error } = await supabase.rpc('increment_material_view', {
      row_id: materialId,
      is_unique: isUnique,
    });

    if (error) {
      console.error('Failed to increment material view:', error.message);
    }
  } catch (err) {
    console.error('Failed to track material view:', err);
  }
}