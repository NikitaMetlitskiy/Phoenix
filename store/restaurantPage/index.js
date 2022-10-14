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
  getData: (state) => state.data?.data?.attributes,
}

export const actions = {
  async getData({commit}) {
    commit('setStatusFetchData', 0)
    this.$i18n.locale === "ua" ? this.locale = "uk-UA" : this.locale = "en"

    await this.$axios.$get(`${this.$axios.defaults.baseURL}/resto-bar?populate[Meta_tags_restobar][populate]=*&populate[Main_restobar][populate]=*&populate[Information][populate]=*&populate[Restaurant_block][populate]=*&populate[Bar][populate]=*&populate[Breakfasts][populate]=Photo_description_block.Photo&populate[Slider_restobar][populate]=*&populate[Delivery_restobar][populate]=*&populate[Form_delivery][populate]=*&locale=${this.locale}`)
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
