export const state = () => ({
  /*
  statusFetchData value :
  0 - loading
  1 - success
  2 - error
  */
  statusFetchData: null,
  data: null,
  locale: "ua",
})

export const getters = {
  getMenuData: (state) => state.data?.data?.attributes,
}

export const actions = {
  async getMenuData({commit}) {
    commit('setStatusFetchData', 0)
    this.$i18n.locale === "ua" ? this.locale = "uk-UA" : this.locale = "en"

    await this.$axios.$get(`${this.$axios.defaults.baseURL}/header-and-menu?populate[Header_and_menu][populate]=*&populate[Menu][populate]=*&locale=${this.locale}`)
      .then((res) => {
        commit('setStatusFetchData', 1)
        commit('setData', res)
      })
      .catch(e => {
        commit('setStatusFetchData', 2)
        console.log(e)
      })
  },
}

export const mutations = {
  setStatusFetchData(state, payload) {
    state.statusFetchData = payload
  },

  setData(state, payload) {
    state.data = payload
  },
}
