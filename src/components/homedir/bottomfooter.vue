<!-- src\components\homedir\bottomfooter.vue -->

<script>
export default {
  name: 'BottomFooter',
  data() {
    return {
      footerExpanded: false,
      footerMaxHeight: '50px',
      toggleIconUrl: require('@/assets/images/socials/toggle_arrow.png'),
    };
  },
  mounted() {
    this.updateFooterHeight();
  },
  methods: {
    toggleFooter() {
    this.footerExpanded = !this.footerExpanded;
    this.$nextTick(() => {
        const newHeight = this.footerExpanded ? '50px' : '50px'; 
        this.footerMaxHeight = newHeight;
        document.documentElement.style.setProperty('--footer-height', newHeight);
        this.$emit('footer-height-changed');
    });
  },
      updateFooterHeight() {
        const newHeight = this.footerExpanded ? '50px' : '50px'; 
        this.footerMaxHeight = newHeight;
        document.documentElement.style.setProperty('--footer-height', newHeight);
      },
      openPrivacyModal() {
      this.$emit('open-privacy-modal');
      },
      openToSModal() {
        this.$emit('open-tos-modal');
      }
    },
  watch: {
    footerExpanded(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.updateFooterHeight();
      }
    },
  },
}
</script>

<template>
  <v-footer color="blue lighten-2" padless>
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="6" class="text-center">
          <v-btn text @click="toggleFooter">
            <v-icon left>mdi-chevron-up</v-icon>
            Quick Links
          </v-btn>
          <v-expand-transition>
            <div v-show="footerExpanded">
              <v-btn text @click="openPrivacyModal">Privacy Policy</v-btn>
              <v-btn text @click="openToSModal">Terms of Service</v-btn>
            </div>
          </v-expand-transition>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="social-icons" v-show="footerExpanded">
            <v-btn icon :href="'https://www.twitter.com/Locati0ns'" target="_blank">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
            <v-btn icon :href="'https://www.instagram.com/loveofgeography'" target="_blank">
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon :href="'https://www.twitter.com/vintagemapstore'" target="_blank">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>


<style scoped>
.footer {
  transition: max-height 0.9s ease;
}
.social-icons {
  display: flex;
  justify-content: space-evenly;
}
</style>