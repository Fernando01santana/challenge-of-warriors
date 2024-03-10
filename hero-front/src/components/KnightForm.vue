<template>
  <Message :msg="msg" v-show="msg" />
  <div>
    <form id="knight-form" class="container mt-4">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="nome">Nome:</label>
          <input
            type="text"
            class="form-control"
            required
            id="nome"
            name="nome"
            v-model="nome"
            placeholder="Digite o seu nome"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="nickname">Nickname:</label>
          <input
            type="text"
            class="form-control"
            required
            id="nickname"
            name="nickname"
            v-model="nickname"
            placeholder="Digite o seu nickname"
          />
        </div>
      </div>
      <div class="form-row">
        <div
          class="form-group col-md-6"
          v-for="(value, attr) in atributos"
          :key="attr"
        >
          <label :for="'atributo-' + attr">{{ capitalize(attr) }}:</label>
          <input
            type="number"
            class="form-control"
            required
            :id="'atributo-' + attr"
            :name="'atributo-' + attr"
            v-model="atributos[attr]"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="dataNascimento">Data de nascimento:</label>
          <input
            type="date"
            class="form-control"
            required
            id="dataNascimento"
            name="dataNascimento"
            v-model="dataNascimento"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="atributoChave">Atributo chave:</label>
          <select class="form-control" v-model="atributoChave" required>
            <option value="">Selecione o seu atributo chave</option>
            <option name="">strength</option>
            <option name="">dexterity</option>
            <option name="">constitution</option>
            <option name="">intelligence</option>
            <option name="">wisdom</option>
            <option name="">charisma</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Weapons:</label>
        <div
          v-for="(weapon, index) in weapons"
          :key="index"
          class="weapon-container"
        >
          <div class="form-row">
            <div class="form-group col-md-3">
              <label>Nome da Arma:</label>
              <input
                type="text"
                class="form-control"
                required
                v-model="weapon.name"
                placeholder="Nome da Arma"
              />
            </div>
            <div class="form-group col-md-2">
              <label>Modificador:</label>
              <input
                type="number"
                class="form-control"
                required
                v-model="weapon.mod"
                placeholder="Modificador"
              />
            </div>
            <div class="form-group col-md-3">
              <label>Atributo:</label>
              <select class="form-control" required v-model="weapon.attr">
                <option value="">Selecione o seu atributo chave</option>
                <option name="" value="strength">strength</option>
                <option name="" value="dexterity">dexterity</option>
                <option name="" value="constitution">constitution</option>
                <option name="" value="intelligence">intelligence</option>
                <option name="" value="wisdom">wisdom</option>
                <option name="" value="charisma">charisma</option>
              </select>
            </div>
            <div class="form-group col-md-2">
              <label class="">Equipada:</label>
              <select class="form-control" required>
                <option value=""></option>
                <option name="true">sim</option>
                <option name="false">nao</option>
              </select>
            </div>
            <div class="form-group col-md-2">
              <label class="text-left">Acao:</label>
              <button
                type="button"
                class="btn btn-danger w-100"
                @click="removeWeapon(index)"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
        <button
          type="button"
          class="btn btn-primary w-100 mt-1"
          @click="addWeapon"
        >
          Adicionar Arma
        </button>
      </div>
      <div class="form-group">
        <input
          class="btn btn-dark w-100"
          type="button"
          value="Criar guerreiro!"
          @click="createknight()"
        />
      </div>
    </form>
  </div>
</template>

<script>
import Message from "./Message";

export default {
  name: "KnightForm",
  data() {
    return {
      paes: null,
      carnes: null,
      opcionaisdata: null,
      nome: null,
      nickname: null,
      dataNascimento: null,
      atributoChave: null,
      pao: null,
      carne: null,
      opcionais: [],
      weapons: [{ name: "", mod: 0, attr: "", equipped: false }],
      status: "Solicitado",
      msg: null,
      atributos: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
      },
    };
  },
  methods: {
    async createknight() {
      if (
        !this.nome ||
        !this.nickname ||
        !this.dataNascimento ||
        !this.atributoChave
      ) {
        this.msg = "Preencha todos os campos do formulário.";
        setTimeout(() => {
          this.msg = null;
        }, 3000);
        return;
      }

      // Verifica se algum campo de arma está vazio
      for (const weapon of this.weapons) {
        if (
          !weapon.name ||
          weapon.mod === null ||
          !weapon.attr ||
          weapon.equipped === null
        ) {
          this.msg = "Preencha todos os campos do formulário.";
          setTimeout(() => {
            this.msg = null;
          }, 3000);
          return;
        }
      }

      for (const attr in this.atributos) {
        if (!this.atributos[attr]) {
          this.msg = "Preencha todos os campos do formulário.";
          return;
        }
      }

      // Verifica se algum campo está vazio nos atributos dinâmicos
      const dynamicAttrs = Object.keys(this.atributos).filter(
        (attr) => !this.atributosFixos || !this.atributosFixos.includes(attr)
      );
      for (const attr of dynamicAttrs) {
        if (!this.atributos[attr]) {
          this.msg = "Preencha todos os campos do formulário.";
          return;
        }
      }

      this.atributos = Object.fromEntries(
        Object.entries(this.atributos).map(([key, value]) => [
          key,
          Number(value),
        ])
      );

      this.weapons.forEach((weapon) => {
        weapon.mod = Number(weapon.mod);
      });
      const guerreiro = {
        name: this.nome,
        nickname: this.nickname,
        birthday: this.formatDate(this.dataNascimento),
        weapons: this.weapons.map((weapon) => ({
          name: weapon.name,
          mod: weapon.mod,
          attr: weapon.attr,
          equipped: weapon.equipped,
        })),
        attributes: { ...this.atributos },
        keyAttribute: this.atributoChave,
      };

      const dataJson = JSON.stringify(guerreiro);
      const req = await fetch(`http://localhost:8000/knights/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      });

      this.clearInputs();
    },
    clearInputs() {
      this.nome = null;
      this.nickname = null;
      this.dataNascimento = null;
      this.atributoChave = null;
      this.weapons = [{ name: "", mod: 0, attr: "", equipped: false }];
      this.atributos = {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
      };
    },
    capitalize(str) {
      if (typeof str !== "string" || str.length === 0) {
        return str;
      }
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    addWeapon() {
      const equippedWeapons = this.weapons.filter((weapon) => weapon.equipped);
      if (equippedWeapons.length > 0) {
        equippedWeapons[0].equipped = false;
      }

      this.weapons.push({ name: "", mod: 0, attr: "", equipped: false });
    },
    removeWeapon(index) {
      this.weapons.splice(index, 1);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date
        .getDate()
        .toString()
        .padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
  },
  components: {
    Message,
  },
};
</script>

<style scoped>
.weapon-container {
  margin-top: 10px;
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
