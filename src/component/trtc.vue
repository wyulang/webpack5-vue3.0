<template>
  <div class="h-1 hidden">
    <div v-html="remoteStream">
    </div>
    <div id='local_stream' class="local-stream">
    </div>
    <div v-html="htmlog" class="fixed zi-8888 fc-warning fs-13 at10 al10 ar10"></div>
  </div>
</template>

<script>
import "lib/TRTCDK";
import 'lib/trtc-sig.js';
export default {
  data() {
    return {
      client: null,
      userId: "",
      roomId: "",
      localStream: "",
      remoteStream: null,
      htmlog: ""
    }
  },
  methods: {
    createClient(userid, roomId) {
      this.userId = userid;
      this.roomId = roomId;
      const SDKAPPID = 1400390923;
      const EXPIRETIME = 604800;
      const SECRETKEY = "ea024a8eeeeaf929e315095fabe5eaeff3f81fc6c892cd47f12bcaf1db4af154";
      const generator = new LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);
      const userSig = generator.genTestUserSig(String(userid));
      this.leaveRoom();
      setTimeout(() => {
        this.client = TRTC.createClient({
          mode: 'rtc',
          sdkAppId: SDKAPPID,
          userId: userid,
          userSig: userSig
        });
        this.subscribeStream(this.client);
        // this.getMai();
        this.entyRoom();
      }, 2000);
    },
    getMai() {
      let microphones = null;
      TRTC.getMicrophones().then(devices => {
        microphones = devices;
        devices.forEach(dev => {
          this.getConsole('microphone label: ' + dev.label + ' deviceId: ' + dev.deviceId);
        });
      });
    },
    getConsole(value) {
      this.htmlog += value + '<br/>';
      setTimeout(() => {
        this.htmlog = "";
      }, 10000);
    },
    entyRoom() {
      this.client && this.client
        .join({ roomId: this.roomId }).catch(error => {
          this.getConsole('进房失败 ' + error);
        }).then(() => {
          this.getConsole('进房成功');
          this.$emit('btnTrtc', true)
          this.createStream();
        });
    },
    createStream() {
      this.localStream = TRTC.createStream({ userId: this.userId, audio: true, video: false });
      this.localStream.initialize().catch(error => {
        // 本地流初始化失败
        switch (error.name) {
          case 'NotReadableError':
            // 提示用户：
            this.getConsole('暂时无法访问摄像头/麦克风，请确保当前没有其他应用请求访问摄像头/麦克风，并重试。');
            break;
          default:
            this.getConsole(error);
            this.leaveRoom();
            break;
        }
      }).then(() => {
        this.getConsole('初始化本地流成功');
        this.localStream.play('local_stream').catch(e => {
          const errorCode = e.getCode();
          if (errorCode === 0x4043) {
            this.roomResume();
          }
        })
        this.client && this.client.publish(this.localStream).catch(error => {
          this.getConsole('本地流发布失败 ' + error);
        }).then(() => {
          this.getConsole('本地流发布成功');
          this.playStream();
          this.client.getTransportStats().then(stats => {
            this.getConsole('RTT: ' + stats.rtt);
          });
        });

      });
    },
    playStream() {
      this.client.on('stream-subscribed', event => {
        const remoteStream = event.stream;
        this.remoteStream = `<div id="${'remote_stream-' + remoteStream.getId()}"  ></div>`;
        this.$nextTick(() => {
          remoteStream.play('remote_stream-' + remoteStream.getId());
        })
      });
    },
    subscribeStream() {
      this.client.on('stream-added', event => {
        const remoteStream = event.stream;
        this.getConsole('远端流增加: ' + remoteStream.getId());
        //订阅远端流
        // this.client.subscribe(remoteStream);
        this.client.subscribe(remoteStream, { audio: true, video: false }).catch(e => {
          this.getConsole('订阅远端流失败');
        })
      });
      this.client.on('error', error => {
        this.getConsole(error.getCode());
      })

      this.client.on('unmute-audio', event => {
        this.getConsole("远端用户启用音频成功");
      });

    },
    roomResume() {
      this.localStream.on('player-state-changed', e => {
        this.getConsole(`用户${this.userId}的${e.type}状态改变为${e.state}，原因是${e.reason}`)
        //由于浏览器自动播放策略可能会导致视频不会自动播放，需要手动吊起
        if (e.state === 'PAUSED' || e.state == 'paused') {
          this.localStream.resume();
          this.localStream.unmuteAudio();
        }
      });
    },
    leaveRoom() {
      this.client && this.client.leave().then(() => {
        this.getConsole('退房成功')
        // 停止本地流，关闭本地流内部的音视频播放器
        this.localStream && this.localStream.stop();
        // 关闭本地流，释放摄像头和麦克风访问权限
        this.localStream && this.localStream.close();
        this.localStream = null;
        this.$emit('btnTrtc', false)
        this.client = null;
        window.location.reload();
        // 退房成功，可再次调用client.join重新进房开启新的通话。
      }).catch(error => {
        this.getConsole('退房失败 ' + error);
      });
    },
  },
  created() {

  },
};
</script>

<style scoped lang="less">
</style>
