import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    people: JSON.parse(localStorage.getItem('people') || '[]') // По умолчанию можно сразу поместить то, чтьо находится в localStorage, но на случай ошибки (если вдруг ничего нет) ставится через "или" [];
  },
  getters: {
    people: s => s.people,
    humanById: s => id => s.people.find(h => h.id === id)
  },
  mutations: {
    createContact(state, human) {
      state.people.push(human) //добавляем данные в state

      localStorage.setItem('people', JSON.stringify(state.people)) // Функция позволяет сохранить данные в localStorage, чтобы не потерерять их при перезагрузки
    },

    addInfoHuman(state, {id ,name, number, title, descr}) {
      const people = state.people.concat()

      const idx = people.findIndex(h => h.id === id)
      const human = people[idx]

      people[idx] = {...human, name, number, title, descr}

      state.people = people
      localStorage.setItem('people', JSON.stringify(state.people))
    },

    deleteContact (state, index) {
      state.people.splice(index, 1)
      localStorage.setItem('people', JSON.stringify(state.people))
    }
  },
  actions: {
    createContact({commit}, human) {
      commit('createContact', human)
    },

    addInfoHuman({commit}, human) {
      commit('addInfoHuman', human)
    },

    deleteContact ({commit}, human) {
     commit('deleteContact', human)
    }
  },
  modules: {
  }
})
