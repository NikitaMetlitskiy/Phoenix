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
  getOffersData: (state) => state.data?.data,
}

export const actions = {
  async getOffersData({commit}) {
    commit('setStatusFetchData', 0)
    this.$i18n.locale === "ua" ? this.locale = "uk-UA" : this.locale = "en"

    await this.$axios.$get(`${this.$axios.defaults.baseURL}/offers?populate[Offer][populate]=Offer_cover_photo,Offer_small_photo,Description_block.Photo_slider&locale=${this.locale}`)
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
