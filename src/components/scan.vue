<template>
  <q-page>
    <q-bar class="pt-4 bg-transparent">
      <q-space />
      <q-btn dark dense flat icon="close" color="white" size="18px" @click="stopScan()">
        <q-tooltip content-class="text-white">Close</q-tooltip>
      </q-btn>
    </q-bar>
  </q-page>
</template>

<script>
export default {
  mounted () {
    this.startScan()
  },
  methods: {
    startScan () {
      QRScanner.scan(displayContents);
      var vm = this
      function displayContents(err, text){
        if(err){
          // an error occurred, or the scan was canceled (error code `6`)
        } else {
          // The scan completed, display the contents of the QR code:
          alert(text);
          QRScanner.destroy(function(status){
            console.log('cancelScan')
            console.log(status);
          });
          vm.$router.go(-1)
        }
      }
      
      // Make the webview transparent so the video preview is visible behind it.
      QRScanner.show();
    },
    stopScan () {
      QRScanner.destroy(function(status){
        console.log('cancelScan')
        console.log(status);
      });
      this.$router.go(-1)
    }
  }
}
</script>

<style>
    
</style>