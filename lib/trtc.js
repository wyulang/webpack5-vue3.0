// import "./TRTCDK";
import TRTC from 'trtc-js-sdk';
import './trtc-sig.js';
class trtc {
  client = null;
  localStream = null;
  constructor() {
  }

  createClient(userid, roomId) {
    this.userId = userid;
    this.roomId = roomId;
    let SDKAPPID = 1400324866;
    let EXPIRETIME = 604800;
    let SECRETKEY = "29799c5bda72a438d19e52b79b636bb1cbf79d8af6e183ffd8bd662b596e2557";
    let generator = new LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);
    let userSig = generator.genTestUserSig(String(userid));
    this.client = TRTC.createClient({
      mode: 'rtc',
      sdkAppId: SDKAPPID,
      userId: userid,
      userSig: userSig
    });
    this.entyRoom(userid,roomId);
  }

  entyRoom(userid,roomId) {
    this.client && this.client
      .join({ roomId: roomId }).catch(error => {
        console.log('进房失败 ' + error);
      }).then(() => {
        console.log('进房成功');
        this.createStream(userid,roomId);
      });
  }

  createStream(userid,roomId) {
    this.localStream = TRTC.createStream({ userId: userid, audio: true, video: false });
    this.localStream.initialize().catch(error => {
      console.log('初始化本地流失败 ' + error);
    }).then(() => {
      console.log('初始化本地流成功');
      this.client && this.client.publish(this.localStream).catch(error => {
        console.log('本地流发布失败 ' + error);
      }).then(() => {
        console.log('本地流发布成功');
      });
    });
  }

  leaveRoom() {
    this.client && this.client.leave().then(() => {
      console.log('退房成功')
      // 停止本地流，关闭本地流内部的音视频播放器
      this.localStream.stop();
      // 关闭本地流，释放摄像头和麦克风访问权限
      this.localStream.close();
      this.localStream = null;
      this.client = null
      // 退房成功，可再次调用client.join重新进房开启新的通话。
    }).catch(error => {
      console.log('退房失败 ' + error);
    });
  }
}

export default new trtc();