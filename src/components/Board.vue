<template>
  <section class="board">
    <h2 class="title">{{ title }}</h2>
    <div class="content">
      <p @click="returnUser(player, i)" v-for="(player, i) in players" :key="i" class="content-item">
        {{ `${player.name} ${player.surname}` }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
import { IPlayer } from "../types/IPlayer";

interface IProps {
  title: string,
  players: {}[],
}

const props = withDefaults(defineProps<IProps>(), {
  title: () => 'Группа ...',
  players: () => [{name: 'sd', surname: 'sd-sd'}],
})

const emit = defineEmits(['returnPlayer'])
/**
 * Возвращает игрока в таблицу через емит в Functionality.vue
 * @function
 * @name returnUser
 * @param {IPlayer} player - обьект игрока
 * @param {number} i - индекс
 */
function returnUser(player: IPlayer, i: number) {
  emit('returnPlayer', {player: player, index: i})
  props.players.splice(i, 1)
}
</script>

<style scoped>
.board {
  transform: translateY(-32px);
  margin-left: 10px;
}

.title {
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 5px;
}

.content {
  width: 200px;
  height: 100%;
  background: #3e3e3e;
  padding: 20px 10px;
}

.content-item {
  margin-bottom: 5px;
  font-size: 18px;
}

.content-item:hover {
  color: var(--main-color);
  cursor: pointer;
}

@media screen and (max-width: 982px){
  .board {
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
  }

  .content {
    height: 200px;
    width: 100%;
  }

}
</style>