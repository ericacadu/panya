<script>
export default {
  methods: {
    fadeInOnLoad() {
      const all = document.querySelectorAll('.fade-out');
      const targetPos = document.getElementById('target').offsetTop;
      const { innerHeight } = window;
      all.forEach((item) => {
        if (innerHeight - item.offsetTop >= innerHeight - targetPos) {
          item.classList.add('fade-in');
        }
      });
    },
    fadeInOnScroll() {
      const all = document.querySelectorAll('.fade-out');
      const targetPos = document.getElementById('target').offsetTop;
      const { innerHeight } = window;
      const windowY = window.scrollY;
      all.forEach((item) => {
        if (windowY + targetPos - item.offsetTop >= innerHeight - targetPos) {
          item.classList.add('fade-in');
        }
      });
    },
  },
  mounted() {
    window.addEventListener('scroll', this.fadeInOnScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.fadeInOnScroll);
  },
};
</script>
