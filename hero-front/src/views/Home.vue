<template>
  <div>
    <Banner />
    <div class="main-container">
      <h1>Cadastre seu guerreiro para a vitoria!</h1>
      <KnightForm />
    </div>
  </div>
</template>

<script>
import Banner from "../components/Banner";
import KnightForm from "../components/KnightForm.vue";
export default {
  name: "Home",
  components: {
    Banner,
    KnightForm,
  },
};
</script>
