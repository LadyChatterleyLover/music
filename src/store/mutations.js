import {SET_CURRENTTIME, SET_SLIDER, SET_CURRENTINDEX, SET_PLAYFLAG} from './mutation-types'
export default {
  [SET_CURRENTTIME] (state, data) {
    state.currentTime = data
  },
  [SET_CURRENTINDEX] (state, data) {
    state.currentIndex = data
  },
  [SET_SLIDER] (state, data) {
    state.slider = data
  },
  [SET_PLAYFLAG] (state, data) {
    state.playFlag = data
  }
}
