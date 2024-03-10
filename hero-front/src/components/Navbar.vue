<template>
  <div>
    <div id="nav">
      <router-link id="logo-url" to="/">
        <img id="logo" :src="logo" :alt="alt" />
      </router-link>
      <router-link to="/">Home</router-link>
      <router-link to="/knights">Todos os knights</router-link>
      <router-link to="/hall-hero/">Hall dos herois</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: ["logo", "alt"],
};
</script>

<style scoped>
#nav {
  background-color: #222;
  border-bottom: 4px solid #111;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#nav #logo-url {
  margin: auto;
  margin-left: 0;
}

#logo {
  width: 40px;
  height: 40px;
}

#nav a {
  color: white;
  text-decoration: none;
  margin: 12px;
  transition: 0.5s;
}

#nav a:hover {
  color: darkgray;
}
</style>
