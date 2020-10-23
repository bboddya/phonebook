<template>
  <div class="about">
    <div class="container">
      <div v-if="human">
        <form class="form form_about__main">
          <div class="form-group">
            <label for="name">Имя:</label>
            <input
              id="name"
              class="name"
              :class="$v.form.name.$error ? 'is-invalid' : ''"
              v-model.trim="human.name"
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
              v-model.trim="human.number"
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
          <!-- <button class="btn">Добавить контакт</button> -->
        </form>

        <div class="wrapper">
          <form class="form form_about" @submit.prevent="checkForm">
            Добавьте свое поле
            <div class="form-group">
              <label for="title">Добавьте название</label>
              <input
                name="title"
                class="title"
                :class="$v.updateForm.title.$error ? 'is-invalid' : ''"
                type="text"
                placeholder="Название"
                v-model.trim="updateForm.title"
              />
              <p
                v-if="
                  $v.updateForm.title.$dirty && !$v.updateForm.title.required
                "
                class="invalid-feedback"
              >
                Обязательное поле!
              </p>
            </div>
            <div class="form-group">
              <label for="descr">Добавьте описание</label>
              <input
                name="descr"
                class="descr"
                :class="$v.updateForm.descr.$error ? 'is-invalid' : ''"
                type="text"
                placeholder="Описание"
                v-model.trim="updateForm.descr"
              />
              <p
                v-if="
                  $v.updateForm.descr.$dirty && !$v.updateForm.descr.required
                "
                class="invalid-feedback"
              >
                Обязательное поле!
              </p>
            </div>
            <button class="btn">Добавить</button>
          </form>

          <div>
            <table v-if="human.length">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Название</th>
                  <th>Описание</th>
                  <th>Дествие</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(info, index) in human" :key="info + index">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Название"
                      v-model.trim="updateForm.title"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Название"
                      v-model.trim="updateForm.descr"
                    />
                  </td>
                  <td>
                    <button class="btn">Удалить</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <p v-else>Дополнительная информация отсутствует</p>
          </div>
        </div>
      </div>
      <p v-else>Номер отсутствует</p>
    </div>
  </div>
</template>

<script>
import { required, numeric } from "vuelidate/lib/validators";

export default {
  name: "About",
  data: () => ({
    form: {
      name: null,
      number: null,
    },
    updateForm: {
      title: [],
      descr: [],
    },
  }),
  validations: {
    form: {
      name: { required },
      number: { required, numeric },
    },
    updateForm: {
      title: { required },
      descr: { required },
    },
  },
  computed: {
    human() {
      return this.$store.getters.humanById(+this.$route.params.id); //Для паерехода по ссылке на элемент по id
    },
    /* people() {
      return this.$store.getters.people; //Получаем обновленный state из store
    }, */
  },
  methods: {
    checkForm() {
      this.$v.updateForm.$touch();
      if (!this.$v.updateForm.$error) {
        this.$store.dispatch("addInfoHuman", {
          id: this.human.id,
          name: this.form.name,
          number: this.form.number,
          title: this.updateForm.title,
          descr: this.updateForm.descr,
        });
      }
    },
  },
  mounted() {
    this.form.name = this.human.name;
    this.form.number = this.human.number;
  },
};
</script>

<style lang="sass">
*
  font-family: 'Roboto', sans-serif
.container
  width: 1200px
  margin: 0 auto

  .wrapper
    display: flex
    justify-content: space-between

  .form
    border: 1px solid #0007e163
    width: 300px
    height: 280px
    display: flex
    flex-wrap: wrap
    align-items: center
    justify-content: center
    border-radius: 15px
    &_about
      height: 300px
      &__main

        width: 100%
        height: 120px
        justify-content: space-evenly

    &_info
      min-height: 150px
  input
    margin-top: 10px
    display: block
    height: 25px
    border-radius: 10px
    padding-left: 10px
    border-color:
    &:focus
      outline: none

  .btn
    margin: 10px 0 10px 0
    height: 30px
    border-radius: 5px
    border: none
    background-color: #0007e163
    color: #ffffff
    padding: 16px 15px
    line-height: 0
    font-size: 15px
    &:hover
      cursor: pointer
    &:focus
      outline: none
    &__delete
      padding: 0 10px

  .invalid-feedback
    font-size: 13px
    color: red
    position: absolute
</style>