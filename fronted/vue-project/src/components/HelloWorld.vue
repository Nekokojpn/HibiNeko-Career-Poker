<template>
<div>
  <h2>RealTimeChat</h2>
 
 <!-- 投稿フォーム -->
 
   <input type="text"  v-model='name' />
  <input type="text" v-model='message' />
   <button v-on:click="sendMessage">送信</button>
 
  <!-- チャットの表示 -->
  <div v-for="(row,index) in messages" :key="index">{{ row.name }}: {{ row.message }}</div>
</div>
</template>

<script>
  import io from 'socket.io-client';
 
  export default {
    name: 'HelloWorld',
    data: () => ({
      name: '',
      message: '',
      messages: [],
      socket : io('192.168.33.77:4000'),
    }),
    methods: {
      // チャットを投稿する処理
      sendMessage(e) {
        e.preventDefault();
        this.socket.emit('POST_MESSAGE', {
            name: this.name,
            message: this.message
        });
        this.message = ''
      },
    },
    mounted(){
      // 投稿されたデータの取得
      this.socket.on('MESSAGE', (data) => {
        this.messages = [...this.messages, data];
      })
    },
}
</script>
 
<style scoped>
</style>