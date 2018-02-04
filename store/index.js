export const state = () => ({
  videos: []
})
export const mutations = {
  videos(state, payload) {
    state.videos = payload
  }
}
