export interface ObjectIndexer<T> {
    [id: string]: T;
}

interface State<T> {
    parent: any;
    base: T;
    copy: T;
    draft: State<T> | null;
    drafts: any;//Partial<{[key in keyof T]: State<any>}>;
    revoke: () => void;
    modified: boolean;
}


export function createDraft<T>(base: T, parent?) {
    const state: State<T> = {
        base,
        copy: base,
        drafts: {},
        //FIXME what to do with revoke?
        revoke: () => {
        },
        parent,
        draft: null,
        modified: false,
    };

    const {proxy, revoke} = Proxy.revocable<State<T>>(state, objectTraps);

    state.draft = proxy;
    state.revoke = revoke;

    return proxy;
}

const objectTraps = {
    get,
    set
};

function get<T>(state: State<T>, prop: keyof T): boolean {
    const {drafts} = state;

    const value = (state.copy || state.base)[prop];

    const state1 = createDraft(value, state);
    drafts[prop] = state1;
    return drafts[prop];
}

function set<T>(state: State<T>, prop: string, value: any): boolean {
    if (!state.modified) {
        const isUnchanged = state.base[prop] === value || state.drafts[prop] === value;
        // If the value didn't change, just return
        if (isUnchanged) {
            return true;
        }
        markChanged(state)
    }

    return true;
}

function markChanged(state) {
    if (!state.modified) {
        state.modified = true;
        state.copy = {...state.base, ...state.drafts};
        state.drafts = null;
        if (state.parent) markChanged(state.parent)
    }
}