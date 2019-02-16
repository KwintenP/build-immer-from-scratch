import { createDraft } from './proxy';

export function produce<T>(base: T, recipe: (draft: T) => void) {
    const baseDraft = createDraft(base);

    recipe(baseDraft as any);
}

