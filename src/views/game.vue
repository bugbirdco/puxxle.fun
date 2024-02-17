<template>
  <div class="mt-5">
    <h1 class="text-center mb-4">Solve for X</h1>
    <div>
      <template v-for="line in lines">
        <div class="d-flex py-2 px-1">
          <div v-for="item in line.output" class="item mx-1" :class="itemClass(line, item)">
            {{ item.value }}
          </div>
        </div>
      </template>
      <div class="mx-2 mt-2">
        <div class="row g-2">
          <div class="col col-9">
            <input v-model="prompt" :disabled="hasWon" class="form-control form-control-lg" @keydown.enter="add"/>
          </div>
          <div class="col">
            <button type="button" class="btn btn-primary btn-lg w-100 h-100" @click="add">Go</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
//== GENERAL IMPORTS ==//

//== COMPONENT IMPORT ==//

//== TYPES & INTERFACES ==//
import {computed, ref} from "vue";

interface Attempt {
  value: string,
  is_match: boolean
  is_partial: boolean
  is_invalid: boolean
}

interface Line {
  input: string
  output: Attempt[]
  is_attempt: boolean
}

//== STORE IMPORT ==//

//== INJECT & PROPS & EMITS =//

//== STORE BINDING ==//

//== DATA & STATE ==//
const input = ref<any[]>([1, 2, 3, 4, 5])
const output = ref<any[]>([2, 4, 6, 8, 10])
const attempts = ref<Line[]>([])
const prompt = ref<string>('x')
const hasWon = ref<boolean>(false)

//== COMPUTED ==//
const attempt = computed<Attempt[]>(() => {
  const values: Attempt[] = []
  for (let i in input.value) {
    try {
      let response = eval(`((x) => {
        return ${prompt.value}
      })
      (${JSON.stringify(input.value[i])})`)
      response = response ? (response.toString().substring(0, 3)) : ''
      const isMatch = response == output.value[i]
      values.push({
        value: response,
        is_match: isMatch,
        is_partial: isMatch || output.value.reduce((isPartial, val) => isPartial || val == response, false),
        is_invalid: false
      })
    } catch (e) {
      console.error(e)
      values.push({
        value: '',
        is_match: false,
        is_partial: false,
        is_invalid: true
      })
    }
  }
  return values
})

const lines = computed<Line[]>(() => {
  if (hasWon.value) return attempts.value
  const line: Line = {
    input: prompt.value,
    output: attempt.value,
    is_attempt: false
  }
  return [...attempts.value, line]
})

//== WATCHER ==//

//== PROVIDE ==//

//== LIFECYCLE HOOK ==//

//== METHOD ==//
function itemClass(line: Line, item: Attempt) {
  if (!line.is_attempt) return {'is-invalid': item.is_invalid}
  return {
    'is-match': item.is_match,
    'is-partial': !item.is_match && item.is_partial,
    'is-invalid': item.is_invalid
  }
}

function add() {
  attempts.value.push({
    input: prompt.value,
    output: [...attempt.value],
    is_attempt: true
  })
  hasWon.value = attempt.value.reduce((win, item) => !win ? win : item.is_match, true)
}

//== EXPOSE ==//

</script>

<style lang="scss" scoped>
// #AAAAAA
// #212529
// #04724D
// #F0EC57
// #EE4266
.item {
  height: 5rem;
  width: 5rem;
  border: 1px solid #aaa;
  border-radius: 1rem;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, .5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;

  &.is-invalid {
    background-color: #aaa;
  }

  &.is-partial {
    background-color: #F0EC57;
    border-color: #F0EC57;
    color: #000;
  }

  &.is-match {
    background-color: #04724D;
    border-color: #04724D;
  }
}
</style>
