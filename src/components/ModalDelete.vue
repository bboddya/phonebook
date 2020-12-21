<template>
  <div class="overlay">
    <div class="modal-delete">
      <div class="modal-delete__title">
        Вы, действительно, хотите удалить данный номер?
      </div>
      <button class="modal-delete__btn btn">Удалить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalDelete",
};
</script>

<style lang="sass">
.modal-delete
    display: flex
    flex-direction: column
    justify-content: space-around
    position: absolute
    max-width: 300px
    min-height: 200px
    border-radius: 15px
    background: #fff
    right: 50%
    bottom: 50%
    transform: translate(50%,50%)
    padding: 30px
    font-size: 18px
    text-align: center
.overlay
    display: none
    position: fixed
    width: 100vw
    height: 100vh
    background: rgba(0, 0, 0, 0.5)
    z-index: 10
    top: 0
    left: 0
</style>