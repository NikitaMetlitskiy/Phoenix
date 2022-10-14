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
  getOfferData: (state) => state.data?.data
}

export const actions = {
  async getOfferData({commit}, payload) {
    commit('setStatusFetchData', 0)
    this.$i18n.locale === "ua" ? this.locale = "uk-UA" : this.locale = "en"

    await this.$axios.$get(`${this.$axios.defaults.baseURL}/offers?filters[Slug][$eq]=${payload}&populate[Meta_tags_offer][populate]=*&populate[Offer][populate]=Offer_cover_photo,Description_block.Photo_slider&locale=${this.locale}`)
      .then((res) => {
        commit('setStatusFetchData', 1)
        commit('setData', res)
        
      })
      .catch(e => {
        commit('setStatusFetchData', 2)
        console.log(e)
      })
  }
}

export const mutations = {
  setStatusFetchData(state, payload) {
    state.statusFetchData = payload
  },

  setData(state, payload) {
    state.data = payload
  }
}
