export default {
  singer: state => state.singer,
  currentSong: state => state.playList[state.currentIndex] || {}
}
