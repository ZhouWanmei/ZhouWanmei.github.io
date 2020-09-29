const state = { layout: false };
const getters = {
    layout: (state) => state.layout,
};

const mutations = {
    changeLayout: (state, layout) => {
        state.layout = layout;
    },
};
const actions = {
    changeLayout({ commit }, layout) {
        commit("changeLayout", layout);
    },
};
export default { state, getters, mutations, actions };
