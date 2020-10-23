<template>
  <div>
    <Contacts />
  </div>
</template>

<script>
import Contacts from "@/components/Contacts.vue";

export default {
  name: "Main",
  components: {
    Contacts,
  },
};
</script>

<style lang="sass" >
*
  font-family: 'Roboto', sans-serif
.container
  width: 1200px
  margin: 0 auto
  h1
    text-align: center

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
