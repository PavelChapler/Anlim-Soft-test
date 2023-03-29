<template>
  <table class="table">
    <thead>
      <tr>
        <td v-for="(col, i) in cols" :key="i" class="table-col table-first-col">
          <div class="col-wrapper">
            {{ col.visibleTitle }}
            <i v-if="col.visibleTitle === 'Участник'" @click="sortByName" class="mdi mdi-sort icon"></i>
            <i v-if="col.visibleTitle === 'Дата рождения'" @click="sortByBirthday" class="mdi mdi-sort icon"></i>
          </div>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr @click="addUser(row, i)" v-for="(row, i) in reactiveRows" :key="i" class="table-row">
        <td v-for="(col, i) in cols" :key="i" class="table-col">
          {{ (col.title === 'name') ? `${row[col.title]} ${row['surname']}` : row[col.title] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, toRef } from "vue";

interface IProps {
  rows: object[],
  cols: object[],
}

const props = withDefaults(defineProps<IProps>(), {
  rows: () => [{
    "id": 164679,
    "name": "Руслан",
    "surname": "Иванов",
    "birthday": "2009-07-07",
  }],
  cols: () => [
    {title: 'id', visibleTitle: '№'},
    {title: 'name', visibleTitle: 'Участник'},
    {title: 'birthday', visibleTitle: 'Дата рождения'},
  ]
})

const emit = defineEmits(["addPlayer"])

const reactiveRows = toRef(props, 'rows')

/**
 * Добавляет пользователя в группу через емит в Functionality.vue
 * @function
 * @name addUser
 * @param {IPlayer} player - обьект игрока
 * @param {number} i - индекс
 */
function addUser (player: object, i: number) {
  emit('addPlayer', {player: player, index: i})
  reactiveRows.value.splice(i, 1)
}
/**
 * Сортировка по имени
 * @function
 * @name sortByName
 */
function sortByName() {
  reactiveRows.value.sort((a, b) => a.name.localeCompare(b.name))
}
/**
 * Сортировка по дате рождения
 * @function
 * @name sortByBirthday
 */
function sortByBirthday() {
  reactiveRows.value.sort((a, b) => +a.birthday.substring(0, 4) - +b.birthday.substring(0, 4))
}

sortByName()
</script>

<style scoped>
.table, .table-col{
  border: 1px solid rgba(174,174,174,.4);
  border-collapse: collapse;
}

.table {
  width: 450px;
}

.table-col {
  padding: 10px;
  text-align: start;
}

.table-row {
  cursor: pointer;
}

.table-row:hover {
  outline: 2px solid var(--main-color);
}

.icon {
  font-size: 22px;
  margin-left: 5px;
  cursor: pointer;
}

.icon:hover {
  color: var(--main-color);
}

.col-wrapper {
  display: flex;
  align-items: center;
}

@media screen and (max-width: 982px) {
  .table {
    width: 100%;
    margin-bottom: 60px;
  }
}

@media screen and (max-width: 576px) {
  .table {
    font-size: 12px;
  }
}
</style>