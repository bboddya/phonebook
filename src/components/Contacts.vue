<template>
  <div class="container">
    <h1>Список контактов</h1>
    <div class="wrapper">
      <form class="form" @submit.prevent="checkForm">
        <div class="form-group">
          <label for="name">Имя:</label>
          <input
            id="name"
            class="name"
            :class="$v.form.name.$error ? 'is-invalid' : ''"
            v-model.trim="form.name"
            type="text"
            placeholder="Введите имя контакта"
          />
          <p
            v-if="$v.form.name.$dirty && !$v.form.name.required"
            class="invalid-feedback"
          >
            Обязательное поле!
          </p>
        </div>
        <div class="form-group">
          <label for="number">Номер:</label>
          <input
            id="number"
            class="number"
            :class="$v.form.number.$error ? 'is-invalid' : ''"
            v-model.trim="form.number"
            type="text"
            placeholder="Введите номер контакта"
          />
          <p
            v-if="$v.form.number.$dirty && !$v.form.number.required"
            class="invalid-feedback"
          >
            Обязательное поле!
          </p>
          <p
            v-if="$v.form.number.$dirty && !$v.form.number.numeric"
            class="invalid-feedback"
          >
            Введите цифры!
          </p>
        </div>
        <button class="btn">Добавить контакт</button>
      </form>
      <div>
        <table v-if="people.length">
          <thead>
            <tr>
              <th>#</th>
              <th>Имя</th>
              <th>Номер</th>
              <th>Дествие</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(human, index) in people" :key="human.id">
              <router-link tag="a" :to="'/about/' + human.id">
                <td>{{ index + 1 }}</td>
                <td>{{ human.name }}</td>
                <td>{{ human.number }}</td>
              </router-link>
              <td>
                <button @click="deleteContact(index)" class="btn">
                  Удалить
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>Нет контактов для отображения</p>
      </div>
    </div>
  </div>
</template>

<script>
import { required, numeric } from "vuelidate/lib/validators";

export default {
  name: "Contacts",
  data() {
    return {
      form: {
        name: null,
        number: null,
      },
      /* allContacts: [], */
    };
  },
  validations: {
    form: {
      name: { required },
      number: { required, numeric },
    },
  },
  methods: {
    checkForm() {
      this.$v.form.$touch();
      if (!this.$v.form.$error) {
        const human = {
          name: this.form.name,
          number: this.form.number,
          id: Date.now(),
          info: [],
        };

        this.$store.dispatch("createContact", human);
      }
    },
    deleteContact(index) {
      this.$store.commit("deleteContact", index);
    },
  },
  computed: {
    people() {
      return this.$store.getters.people; //Получаем обновленный state из store
    },
  },
};
</script>

