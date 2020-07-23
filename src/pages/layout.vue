<template>
  <section class="app-forum">
    <navbar />
    <div class="app-forum-container">
      <router-view />
    </div>
  </section>
</template>

<script>
import navbar from '@page/components/navbar'
import { getMesSummary } from '@/api/index'
function getParam (queryName) {
  var reg = new RegExp('(^|&)' + queryName + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r !== null) {
    return decodeURI(r[2])
  } else {
    return ''
  }
}
export default {
  components: {
    navbar
  },
  beforeRouteEnter (to, from, next) {
    // window.localStorage.setItem('DirectHost', '192.168.20.144')
    const token = getParam('token')
    if (token) {
      localStorage.setItem('token', token)
    } else {
      // const tmpToken = '' +
      //   'eyJhbGciOiJIUzUxMiIsInppcCI6IkRFRiJ9.eNqUU02P0zAQ_S85uyvnO-ltxQlp4cQfsJNJaprYkR1vkyIkQBy5IMSB23LhthKCy-4C4s9sd-FfYCdNuwUOUKnyvOc3kxn7-YnzuGXO3MljkngkKmY4DmAWeEk8o16czoIw9CECNw2w5yBHaWrECSF-HAVJlGOa0jjBbpS7Pi7CIqcY-8QImVJGWPeiKFgGTUVamLViCXymQJ6CtBLSOnM3TEMvjcIkRg50zUj4fhpbQsjyRPDyIanBFNtcfv_55vn1xbPri_Oj23ffrq9e35y937y6Orp5-3Fz_uH2y0tnyNnq77KZkM393JDYgAZkfU_kYDvMKqKUBOBzjF00dMtINVfQ_p2gTT2vCSclyAF3i-bBAP9AHiJ5LkGpE6bGXMVKrptt-sAshFaMlwfxKYPVQLSS9GM1iaAj9RQrMwzsZSO0USlJrs1Bb_dcVAtpWs_6rBoFI95ljjAnLdmLh4q9amH3OS5kTaoJMV4IMwHjrflPbTJ-0Pjvc-8U_9FDy2p4RGh1Z9A9ZdEpcA0HV2G-KbTMhm1rr7ocbtzLUkwoTWIXG0cHLnZt5BNjYIJxEI6esX4wYrXQnQZDaWPT4ywTmrfWJQvgreb2AUC3dZEUFUwuyte0Kat-Z5fjvGYcKZPVMJQty0r2ZlFrs7TG0J3mlUa0tinK3PsK-LR2jIgppnof1UZSrvvCprie76IlESuNsgVZEo5WwBamIOsB5X1Zoa61OltrvSC8REtqyKy0O3Td272i7Kp8O-f0vr6e_XjxaXP5eUsPp_cPT92c3qE0o24RJeagTeQFKY4jbH6x8_QXAAAA__8.2MHIBZPV-TcaZ--a68ggpKM-Or9oQ7DvKVjFwinBUWVSZ7ocUjXXoc6145ICTQWXn_vzAONRrrMfiGHG3W76bA'
      // localStorage.setItem('token', tmpToken)
    }
    next()
  },
  beforeCreate () {
    getMesSummary().then(res => {
      this.$store.commit('getNoticeNum', res.messageCount)
    })
  }
}
</script>
