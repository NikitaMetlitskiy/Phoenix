export const state = () => ({
  /*
  statusFetchData value :
  0 - loading
  1 - success
  2 - error
  */
  statusFetchData: null,
  data: null,
  statusFetchDataMain: null,
  dataMain: null,
  statusFetchDataAbout: null,
  dataAbout: null,
  statusFetchDataAccommodation: null,
  dataAccommodation: null,
  statusFetchDataSpa: null,
  dataSpa: null,
  statusFetchDataSvg: null,
  dataSvg: null,
  statusFetchDataRestoBar: null,
  dataRestoBar: null,
  statusFetchDataSpecials: null,
  dataSpecials: null,
  statusFetchDataInstagram: null,
  dataInstagram: null,
  statusFetchDataInstaList: null,
  dataInstaList: null,
  locale: "ua",

  weather: null,
  currentTime: 0
})

export const getters = {
  getMetaData: (state) => state.data?.data?.attributes,
  getDataMain: (state) => state.dataMain?.data?.attributes?.Main,
  getDataAbout: (state) => state.dataAbout?.data?.attributes?.About,
  getDataAccommodation: (state) => state.dataAccommodation?.data?.attributes?.Accommodation,
  getDataSpa: (state) => state.dataSpa?.data?.attributes?.SPA,
  getDataSvg: (state) => state.dataSvg?.data?.attributes?.Text_and_svg,
  getDataRestoBar: (state) => state.dataRestoBar?.data?.attributes?.RestoBar_Phoenix,
  getDataSpecials: (state) => state.dataSpecials?.data?.attributes?.Special_offers,
  getDataInstagram: (state) => state.dataInstagram?.data?.attributes?.Instagram,
  getDataInstaList: (state, getters) => state.dataInstaList?.data.slice(0,10),

  getWeather: (state) => state.weather,
  getCurrentTime: (state) => state.currentTime,
}

export const actions = {
  async getWeatherData({commit}){
    const apiKey = '1a8e150a820b72e9722e853ea6039448';
    const coords = {
      lat: '48.345473',
      lon: '24.44902',
    };

    await this.$axios.$get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`)
      .then((res) => {
        commit('setWeatherData', res)
      })
      .catch(e => {
        console.log(e)
      })
  },

  async getMetaData({commit}) {
    commit('setStatusFetchData', 0)
    this.$i18n.locale === "ua" ? this.locale = "uk-UA" : this.locale = "en"

    await this.$axios.$get(`${this.$axios.defaults.baseURL}/main?populate[Meta_tags_main][populate]=*&locale=${this.locale}`)
      .then((res) => {
        commit('setStatusFetchData', 1)
        commit('setData', res)
      })
      .catch(e => {
        commit('setStatusFetchData', 2)
        console.log(e)
      })
  },
  async getDataMain({commit}) {
    commit('setStatusFetchDataMain', 0)
    this.$i18n.locale === "ua" ? this.locale = "uk-UA" : this.locale = "en"
    await this.$axios.$get(`${this.$axios.defaults.baseURL}/main?populate[Main][populate]=*&locale=${this.locale}`)
      .then((res) => {
        commit('setStatusFetchDataMain', 1)
        commit('setDataMain', res)
      })
      .catch(e => {
        commit('setStatusFetchDataMain', 2)
        console.log(e)
      })
  },
  async getDataAbout({commit}) {
    commit('setStatusFetchDataAbout', 0)
    this.$i18n.locale === "ua" ? this.locale = "uk-UA" : this.locale = "en"
    await this.$axios.$get(`${this.$axios.defaults.baseURL}/main?populate[About][populate]=*&locale=${this.locale}`)
      .then((res) => {
        commit('setStatusFetchDataAbout', 1)
        commit('setDataAbout', res)
      })
      .catch(e => {
        commit('setStatusFetchDataAbout', 2)
        console.log(e)
      })
  },
  async getDataAccommodation({commit}) {
    commit('setStatusFetchDataAccommodation', 0)
    this.$i18n.locale === "ua" ? this.locale = "uk-UA" : this.locale = "en"
    await this.$axios.$get(`${this.$axios.defaults.baseURL}/main?populate[Accommodation][populate]=*&locale=${this.locale}`)
      .then((res) => {
        commit('setStatusFetchDataAccommodation', 1)
        commit('setDataAccommodation', res)
      })
      .catch(e => {
        commit('setStatusFetchDataAccommodation', 2)
        console.log(e)
      })
  },
  async getDataSpa({commit}) {
    commit('setStatusFetchDataSpa', 0)
    this.$i18n.locale === "ua" ? this.locale = "uk-UA" : this.locale = "en"
    await this.$axios.$get(`${this.$axios.defaults.baseURL}/main?populate[SPA][populate]=Spa_left.Photo_left,Spa_right.Photo_right&locale=${this.locale}`)
      .then((res) => {
        commit('setStatusFetchDataSpa', 1)
        commit('setDataSpa', res)
      })
      .catch(e => {
        commit('setStatusFetchDataSpa', 2)
        console.log(e)
      })
  },
  async getDataSvg({commit}) {
    commit('setStatusFetchDataSvg', 0)
    this.$i18n.locale === "ua" ? this.locale = "uk-UA" : this.locale = "en"
    await this.$axios.$get(`${this.$axios.defaults.baseURL}/main?populate[Text_and_svg][populate]=SVG&locale=${this.locale}`)
      .then((res) => {
        commit('setStatusFetchDataSvg', 1)
        commit('setDataSvg', res)
      })
      .catch(e => {
        commit('setStatusFetchDataSvg', 2)
        console.log(e)
      })
  },
  async getDataRestoBar({commit}) {
    commit('setStatusFetchDataRestoBar', 0)
    this.$i18n.locale === "ua" ? this.locale = "uk-UA" : this.locale = "en"
    await this.$axios.$get(`${this.$axios.defaults.baseURL}/main?populate[RestoBar_Phoenix][populate]=Photo_restobar_cover&locale=${this.locale}`)
      .then((res) => {
        commit('setStatusFetchDataRestoBar', 1)
        commit('setDataRestoBar', res)
      })
      .catch(e => {
        commit('setStatusFetchDataRestoBar', 2)
        console.log(e)
      })
  },
  async getDataSpecials({commit}) {
    commit('setStatusFetchDataSpecials', 0)
    this.$i18n.locale === "ua" ? this.locale = "uk-UA" : this.locale = "en"
    await this.$axios.$get(`${this.$axios.defaults.baseURL}/main?populate[Special_offers][populate]=Special_offer_card.Svg_under_photo,Special_offer_card.Photo&locale=${this.locale}`)
      .then((res) => {
        commit('setStatusFetchDataSpecials', 1)
        commit('setDataSpecials', res)
      })
      .catch(e => {
        commit('setStatusFetchDataSpecials', 2)
        console.log(e)
      })
  },
  async getDataInstagram({ dispatch, commit }, payload = false) {
    commit('setStatusFetchDataInstagram', 0)
    this.$i18n.locale === "ua" ? this.locale = "uk-UA" : this.locale = "en"
    await this.$axios.$get(`${this.$axios.defaults.baseURL}/main?populate[Instagram][populate]=Photo_cover,Photo_for_slider&locale=${this.locale}`)
      .then((res) => {
        commit('setStatusFetchDataInstagram', 1)
        commit('setDataInstagram', res)

        const dataToken = res.data?.attributes?.Instagram?.Token_instagram

        dispatch("getDataInstaList", dataToken);
      })
      .catch(e => {
        commit('setStatusFetchDataInstagram', 2)
        console.log(e)
      })
  },
  async getDataInstaList({commit}, payload) {
    if(!payload){
      return
    }

    commit('setStatusFetchDataInstaList', 0)
    await this.$axios.$get(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&access_token=${payload}`)
      .then((res) => {
        commit('setStatusFetchDataInstaList', 1)
        commit('setDataInstaList', res)
      })
      .catch(e => {
        commit('setStatusFetchDataInstaList', 2)
        console.log(e)
      })
  },
}

export const mutations = {
  setWeatherData(state, payload){
    state.weather = payload
  },

  setCurrentTime(state){
    const currentTime = `${new Date().getHours() > 9 ? new Date().getHours() : '0' + new Date().getHours()}:
        ${new Date().getMinutes() > 9 ? new Date().getMinutes() : '0' + new Date().getMinutes()}`;
    state.currentTime = currentTime;
  },

  setStatusFetchData(state, payload) {
    state.statusFetchData = payload
  },

  setData(state, payload) {
    state.data = payload
  },

  setStatusFetchDataMain(state, payload) {
    state.statusFetchDataMain = payload
  },

  setDataMain(state, payload) {
    state.dataMain = payload
  },

  setStatusFetchDataAbout(state, payload) {
    state.statusFetchDataAbout = payload
  },

  setDataAbout(state, payload) {
    state.dataAbout = payload
  },

  setStatusFetchDataAccommodation(state, payload) {
    state.statusFetchDataAccommodation = payload
  },

  setDataAccommodation(state, payload) {
    state.dataAccommodation = payload
  },

  setStatusFetchDataSpa(state, payload) {
    state.statusFetchDataSpa = payload
  },

  setDataSpa(state, payload) {
    state.dataSpa = payload
  },

  setStatusFetchDataSvg(state, payload) {
    state.statusFetchDataSvg = payload
  },

  setDataSvg(state, payload) {
    state.dataSvg = payload
  },

  setStatusFetchDataRestoBar(state, payload) {
    state.statusFetchDataRestoBar = payload
  },

  setDataRestoBar(state, payload) {
    state.dataRestoBar = payload
  },

  setStatusFetchDataSpecials(state, payload) {
    state.statusFetchDataSpecials = payload
  },

  setDataSpecials(state, payload) {
    state.dataSpecials = payload
  },

  setStatusFetchDataInstagram(state, payload) {
    state.statusFetchDataInstagram = payload
  },

  setDataInstagram(state, payload) {
    state.dataInstagram = payload
  },

  setStatusFetchDataInstaList(state, payload) {
    state.statusFetchDataInstaList = payload
  },

  setDataInstaList(state, payload) {
    state.dataInstaList = payload
  },
}
