<template>
  <Banner />
  <h1 class="mt-4">Knights vivos!</h1>
  <div id="knight-table" v-if="knight && knight.length > 0">
    <div>
      <div id="knight-table-heading">
        <div>Armas:</div>
        <div>Atributo:</div>
        <div>Experiencia:</div>
        <div>Idade:</div>
        <div>Nome:</div>
        <div>Ataque:</div>
      </div>
    </div>
    <div id="knight-table-rows">
      <div class="knight-table-row" v-for="knight in knight" :key="knight.id">
        <div>{{ knight.armas }}</div>
        <div>{{ knight.atributo }}</div>
        <div>{{ knight.experiencia }}</div>
        <div>{{ knight.idade }}</div>
        <div>{{ knight.nickname }}</div>
        <div>{{ knight.ataque }}</div>
        <div>
          <input
            type="text"
            class="update-btn"
            v-model="knight.newNickname"
            placeholder="Novo Nickname"
            @keyup.enter="updateknight(knight.id)"
          />
          <button class="delete-btn" @click="deleteknight(knight.id)">
            Deletar
          </button>
          <span v-if="knight.loading">Carregando...</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h2>Nenhum Knight cadastrado!</h2>
  </div>
</template>
<script>
import Banner from "../components/Banner.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Dashboard",
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
      const req = await fetch("http://localhost:8000/knights");
      const data = await req.json();
      this.knight = data;
    },
    async deleteknight(id) {
      const req = await fetch(`http://localhost:8000/knights/${id}`, {
        method: "DELETE",
      });

      this.getKnights();
    },
    async updateknight(id) {
      const dataJson = JSON.stringify({
        nickname: this.knight.find((knight) => knight.id === id).newNickname,
      });
      const req = await fetch(`http://localhost:8000/knights/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      });

      this.newNickname = "";
      await this.getKnights();
    },
  },
  mounted() {
    this.getKnights();
  },
};
</script>

<style scoped>
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
