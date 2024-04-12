<template>
  <div class="main">
    <div :class="{ 'show-modal-block': isShowModal }" class="modal-block">
      <div class="modal-block__modal-body">
        <h5 class="modal-body__title">Winner</h5>
        <p class="modal-body__text">Start Next Level</p>
        <div class="modal-body__btn-block">
          <button class="btn-block__btn" @click="onStartGameFunc">Next</button>
        </div>
      </div>
    </div>

    <audio id="tap-audio" class="tap-audio">
      <source src="../assets/audio/tap.mp3" />
    </audio>

    <div class="main__game-block">
      <div class="game-block__options">
        <div class="game-block__info">
          <p>
            <span>Lvl: </span><b>{{ lvl }}</b>
          </p>
          <p>
            <span>Score: </span><b>{{ score }}</b>
          </p>
        </div>
        <div class="game-block__select">
          <select class="select-block" v-model="difficulty">
            <option selected disabled>Select Lvl</option>
            <option value="slow">Slow</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      <div class="game-block">
        <button
          v-for="index in buttons"
          class="game-block__block"
          :class="'game-block__block_' + index"
          :data-id="index - 1"
          @click="onSubmitBtnFunc(index - 1)"
          :disabled="isDisableBtn"
        ></button>
      </div>
      <button
        class="game-start__btn"
        @click="onStartGameFunc"
        :disabled="isDisableStartBtn"
      >
        START
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

let buttons = ref(4);
let isShowModal = ref(false);
let submitBtnIndex = ref(0);
let lvl = ref(1);
let btnCount = ref([]);
let score = ref(0);
let difficulty = ref("slow");
let isDisableBtn = ref(true);
let isDisableStartBtn = ref(false);
let difficultyTime = ref({
  slow: {
    interval: 1000,
    timeout: 500,
  },
  medium: {
    interval: 800,
    timeout: 300,
  },
  hard: {
    interval: 500,
    timeout: 200,
  },
});

function onStartGameFunc() {
  if(isDisableStartBtn.value) return;
  isDisableBtn.value = true;
  isDisableStartBtn.value = true;
  isShowModal.value = false;
  for (let i = 0; i < lvl.value + 3; i++) {
    btnCount.value.push(Math.floor(Math.random() * 4));
  }
  onPaintBtnFunc();
}
function onPaintBtnFunc() {
  let i = 0;
  const timeInterval = setInterval(() => {
    if (i === btnCount.value.length - 1) {
      clearInterval(timeInterval);
      isDisableBtn.value = false;
    }
    let elem = document.querySelector(`[data-id='${btnCount.value[i]}']`);
    let elemBorderColor = window.getComputedStyle(elem).borderColor;
    elem.style.cssText = `background-color: ${elemBorderColor};`;
    setTimeout(
      () => (elem.style.cssText = "background-color: none;"),
      difficultyTime.value[difficulty.value].timeout,
    );
    i++;
  }, difficultyTime.value[difficulty.value].interval);
}

function onSubmitBtnFunc(dataId) {
  if (isDisableBtn.value) return;
  if (btnCount.value.length) {
    let audioPlay = document.getElementById("tap-audio");
    audioPlay.play();
    if (
      btnCount.value[submitBtnIndex.value] === dataId &&
      submitBtnIndex.value === btnCount.value.length - 1
    ) {
      isShowModal.value = true;
      onIncreaseLevelFunc();
      return;
    }
    if (btnCount.value[submitBtnIndex.value] === dataId) {
      submitBtnIndex.value += 1;
      return;
    }
    if (btnCount.value[submitBtnIndex.value] !== dataId) {
      alert("Вы проиграли");
      resetAllValuesFunc();
    }
  }
}

function resetAllValuesFunc() {
  submitBtnIndex.value = 0;
  lvl.value = 1;
  btnCount.value = [];
  score.value = 0;
  isDisableStartBtn.value = false
}
function onIncreaseLevelFunc() {
  lvl.value += 1;
  submitBtnIndex.value = 0;
  btnCount.value = [];
  score.value += lvl.value * 100;
  isDisableStartBtn.value = false;
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: lightgrey;
}
.tap-audio {
  display: none;
}
.main__game-block {
  width: 250px;
}
.game-block__options {
  display: flex;
  padding: 20px 0;
  width: 100%;
  justify-content: space-between;
}
.game-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.game-block__info {
  display: flex;
  flex-direction: column;
  grid-row-gap: 10px;
}
.select-block {
  background-color: transparent;
  padding: 5px;
  border-radius: 5px;
}
.game-block__block {
  min-width: 100px;
  min-height: 100px;
  border-radius: 10px;
  background-color: transparent;
}
.game-block__block_1 {
  border: 2px solid green;
}
.game-block__block_2 {
  border: 2px solid red;
}
.game-block__block_3 {
  border: 2px solid yellow;
}
.game-block__block_4 {
  border: 2px solid cornflowerblue;
}
.game-start__btn {
  margin: 20px 0;
  padding: 10px 0;
  width: 100%;
  background-color: transparent;
  border: 1px solid red;
  transition:
    background-color,
    color 500ms;
  border-radius: 5px;
  cursor: pointer;
}
.game-start__btn:hover {
  background-color: red;
  color: whitesmoke;
}
.game-start__btn:disabled:hover {
  background-color: transparent;
  color: gray;
}

.modal-block {
  opacity: 0;
  position: absolute;
  top: -50%;
  transition: all 500ms;
  width: 100%;
  height: 100vh;
  z-index: -20;
  display: flex;
  justify-content: center;
}
.show-modal-block {
  z-index: 10;
  opacity: 1;
  top: 20px;
}
.modal-block__modal-body {
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 200px;
  background-color: white;
  height: max-content;
  border-radius: 10px;
  box-shadow: 0 0 3px 2px gray;
  font-family: sans-serif;
}
.modal-body__title {
  font-size: 18px;
}
.modal-body__text {
  font-size: 15px;
}
.modal-body__btn-block {
  display: flex;
  justify-content: end;
  margin: 10px 10px 0 0;
}
.btn-block__btn {
  padding: 5px 10px;
  background-color: transparent;
  border-radius: 10px;
  border: 1px solid green;
  font-family: sans-serif;
  transition:
    background-color,
    color 500ms;
  cursor: pointer;
}
.btn-block__btn:hover {
  background-color: green;
  color: white;
}
</style>
