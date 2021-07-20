<script>
export default {
  data() {
    return {
      isValid: false,
    };
  },
  methods: {
    validation() {
      const forms = document.querySelectorAll('.needs-validation');
      Array.prototype.slice.call(forms)
        .forEach((form) => {
          form.addEventListener('submit', (e) => {
            this.validated(e, form);
          });
          form.addEventListener('change', (e) => {
            this.validated(e, form);
          });
        });
    },
    validated(e, form) {
      form.classList.remove('was-validated');
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        this.isValid = false;
      } else {
        this.isValid = true;
      }
      form.classList.add('was-validated');
    },
  },
  mounted() {
    this.validation();
  },
};
</script>

<style lang="sass">
.needs-validation .no-valid
  padding-right: inherit !important
</style>
