<template>
  <section class="menu">
    <header>
      <menu>
        <ul class="list">
          <li><router-link to="/" class="link">Home</router-link></li>
          <li><router-link to="/functionality" class="link">Players</router-link></li>
        </ul>
      </menu>
    </header>
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped>
.menu {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 60px;
}

.list {
  display: flex;
  justify-content: center;
}

.link {
  margin: 0 25px;
  font-size: 20px;
}
</style>