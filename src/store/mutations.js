import types from './mutation-types'
export default {
  [types.SET_SINGER] (state, data) {
    state.singer = data
  },
  [types.SET_PLAYING_STATE] (state, data) {
    state.playing = data
  },
  [types.SET_FULL_SCREEN] (state, data) {
    state.fullScreen = data
  },
  [types.SET_PLAYING] (state, data) {
    state.playList = data
  },
  [types.SET_SEQUENCE_LIST] (state, data) {
    state.sequenceList = data
  },
  [types.SET_PLAY_MODE] (state, data) {
    state.mode = data
  },
  [types.SET_CURRENT_INDEX] (state, data) {
    state.currentIndex = data
  }
}
