<template>
  <Banner />
  <h1 class="mt-4">Nossos Herois!</h1>
  <div id="knight-table" v-if="knight && knight.length > 0">
    <div>
      <div id="knight-table-heading">
        <div>Nome:</div>
        <div>Nickname:</div>
        <div>Moedas de Honra:</div>
      </div>
    </div>
    <div id="knight-table-rows">
      <div class="knight-table-row" v-for="knight in knight" :key="knight.id">
        <div>{{ knight.name }}</div>
        <div>{{ knight.nickname }}</div>
        <span class="star-icon"> </span>
        <span class="star-icon"> </span>
        <span class="star-icon"> </span>
        <span class="star-icon"> </span>
        <span class="star-icon"> </span>
        <div>
          <span v-if="knight.loading">Carregando...</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h2>Nenhum heroi encontrado!</h2>
  </div>
</template>
<script>
import Banner from "../components/Banner.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "HallOfHeroes",
  components: {
    Banner,
    Footer,
  },
  data() {
    return {
      knight: null,
      knight_id: null,
      status: [],
    };
  },
  methods: {
    async getKnights() {
      const req = await fetch(
        "http://localhost:8000/knights/heroes?filter=hero"
      );

      this.knight = data;
    },
  },
  mounted() {
    this.getKnights();
  },
};
</script>

<style scoped>
.star-icon {
  width: 16px;
  height: 16px;
  display: inline-block;
  background: url("/img/star.png") no-repeat center center;
  background-size: cover;
  margin-right: 5px;
}

#knight-table {
  max-width: 1200px;
  margin: 0 auto;
}

#knight-table-heading,
#knight-table-rows,
.knight-table-row {
  display: flex;
  flex-wrap: wrap;
}

#knight-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #333;
}

.knight-table-row {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #ccc;
}

#knight-table-heading div,
.knight-table-row div {
  width: 12%;
}

#knight-table-heading .order-id,
.knight-table-row .order-number {
  width: 5%;
}

select {
  padding: 12px 6px;
  margin-right: 12px;
}

.delete-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  margin-top: 5px;
  cursor: pointer;
  transition: 0.5s;
  width: 202px;
}

.delete-btn:hover {
  background-color: transparent;
  color: #222;
}

.update-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.update-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>
