import config from '../common/config'
export default  {
  singer: {},
  playing: false, // 播放器的播放状态
  fullScreen: false, // 播放器是否全屏
  playList: [], // 播放列表(因为有多种播放模式)
  sequenceList: [], // 顺序列表
  mode: config.playMode.sequence, // 播放模式
  currentIndex: -1, // 当前播放歌曲的位置
}
