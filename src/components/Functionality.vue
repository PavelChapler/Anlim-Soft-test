<script setup lang="ts">
import Table from './Table.vue'
import Board from './Board.vue'
import { reactive, Ref, ref } from 'vue'
import { IPlayer } from "../types/IPlayer";
import { IServerPlayer } from "../types/IServerPlayer";
import {onBeforeRouteLeave} from "vue-router";

const cols = [
  { title: 'id', visibleTitle: '№' },
  { title: 'name', visibleTitle: 'Участник' },
  { title: 'birthday', visibleTitle: 'Дата рождения' },
]

const players = ref<IPlayer[]>([
  {
    "id": 164679,
    "name": "Руслан",
    "surname": "Иванов",
    "birthday": "2009-07-07",
  },
  {
    "id": 163246,
    "name": "Артем",
    "surname": "Пулов",
    "birthday": "1998-08-09",
  },
  {
    "id": 164535,
    "name": "Иван",
    "surname": "Путров",
    "birthday": "2007-04-10",
  },
  {
    "id": 163604,
    "name": "Александр",
    "surname": "Назаров",
    "birthday": "2004-10-06",
  },
  {
    "id": 163636,
    "name": "Иван",
    "surname": "Киселев",
    "birthday": "2005-10-29",
  },
  {
    "id": 164836,
    "name": "Ольгерд",
    "surname": "Ковенко",
    "birthday": "2006-12-25",
  },
  {
    "id": 164101,
    "name": "Павел",
    "surname": "Кондратьев",
    "birthday": "1985-10-20",
  },
  {
    "id": 164457,
    "name": "Иван",
    "surname": "Ковенко",
    "birthday": "2006-07-18",
  },
  {
    "id": 162937,
    "name": "Александр",
    "surname": "Миронов",
    "birthday": "2000-03-29",
  },
  {
    "id": 164009,
    "name": "Артем",
    "surname": "Красковский",
    "birthday": "1985-10-20",
  },
]);
/**
 * Эта переменная содержит отсортированных по группам игроков
 * @type {Object}
 * @property {Array} group1 - Массив игроков первой группы
 * @property {Array} group2 - Массив игроков второй группы
 * @property {Array} group3 - Массив игроков третьей группы
 */
const sortedPlayers = reactive<{group1: IPlayer[], group2: IPlayer[], group3: IPlayer[]}>({
  group1: [],
  group2: [],
  group3: []
})
/**
 * Индексы для добавления элемента обратно в таблицу на свое место
 * @type {Map<object, number>}
 * */
const indexes: Map<object, number> = new Map();
/**
 * Сохранил ли пользователь изменения?
 * @type {Ref<boolean>}
 */
const isChanged: Ref<boolean> = ref(true);
/**
 * Данные для отправки на сервер
 * @type {IServerPlayer[]}
 * */
const dataForServer: IServerPlayer[] = []

/**
 * Добавляет игроков в группы
 * @function
 * @name addPlayerToSortedPlayers
 * @param {IPlayer} player - обьект игрока
 * @param {number} i - индекс
 */
function addPlayerToSortedPlayers(player: IPlayer, i: number) {
  if (sortedPlayers.group1.length < 3) {
    sortedPlayers.group1.push(player)
  } else if (sortedPlayers.group2.length < 3) {
    sortedPlayers.group2.push(player)
  } else {
    sortedPlayers.group3.push(player)
  }

  indexes.set(player, i)
}

/**
 * Возвращает игроков в таблицу
 * @function
 * @name returnPlayerToPlayers
 * @param {IPlayer} player - обьект игрока
 */
function returnPlayerToPlayers(player: IPlayer) {
  isChanged.value = true
  players.value.splice(indexes.get(player)-players.value.length - indexes.size, 0, player)
  players.value.sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Подготавливает и сохраняет данные для отправки на сервер
 * @function
 * @name save
 */
function save() {
  if (sortedPlayers.group3.length < 3 || sortedPlayers.group2.length < 3 || sortedPlayers.group1.length < 3) {
    alert('Пожалуйста, заполните группы игроков полностью')
    return
  }

  isChanged.value = false

  sortedPlayers.group1.forEach(player => dataForServer.push({player_id: player.id, group_id: 1}))
  sortedPlayers.group2.forEach(player => dataForServer.push({player_id: player.id, group_id: 2}))
  sortedPlayers.group3.forEach(player => dataForServer.push({player_id: player.id, group_id: 3}))

  console.log(JSON.stringify(dataForServer))
}

onBeforeRouteLeave((to, from) => {
  if (isChanged.value) {
    alert('Пожалуйста, сохраните внесенные изменения')
    return false
  } else return true
})

</script>

<template>
  <section class="functionality container">
    <Table :cols="cols" :rows="players" @addPlayer="(data) => addPlayerToSortedPlayers(data.player, data.index)"/>
    <Board title="Группа 1" :players="sortedPlayers.group1" @returnPlayer="(data) => returnPlayerToPlayers(data.player)"/>
    <Board title="Группа 2" :players="sortedPlayers.group2" @returnPlayer="(data) => returnPlayerToPlayers(data.player)"/>
    <Board title="Группа 3" :players="sortedPlayers.group3" @returnPlayer="(data) => returnPlayerToPlayers(data.player)"/>
  </section>
  <button @click="save" class="btn">Сохранить</button>
</template>

<style scoped>
.functionality {
  margin-top: 120px;
  display: flex;
  justify-content: center;
}

.btn {
  background: #464646;
  margin-top: 10px;
  border-radius: 10px;
}

.btn:hover {
  outline: 2px solid var(--main-color);
}

@media screen and (max-width: 982px){
  .functionality {
    flex-direction: column;
    align-items: center;
  }
}
</style>