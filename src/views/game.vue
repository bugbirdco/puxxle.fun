<template>
  <div class="mt-5 game-stage">
    <div>
      <template v-if="inputChecked">
        <div class="d-flex justify-content-center py-2 px-4">
          <div v-for="item in inputChecked" class="item mx-1" :class="itemClass(null, item)">
            {{ item.value }}
          </div>
        </div>
        <hr class="my-2 mx-5"/>
      </template>
      <template v-for="line in lines">
        <div class="d-flex justify-content-center py-2 px-4">
          <div v-for="item in line.output" class="item mx-1" :class="itemClass(line, item)">
            {{ item.value }}
          </div>
        </div>
      </template>
      <div class="prompt mx-4 px-3 mt-2">
        <div class="row g-2">
          <div class="col col-9 d-flex flex-column align-items-center">
            <input ref="promptField" v-model="prompt" :disabled="hasWon" class="form-control form-control-lg"
                   autocorrect="off"
                   autocapitalize="none" @keydown.enter="add"/>
          </div>
          <div class="col">
            <button type="button" :disabled="hasWon" class="btn btn-primary btn-lg w-100 h-100" @click="add">Go</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div ref="winModal_" class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <h3 class="text-center">🎉🎉🎉 YAY 🎉🎉🎉</h3>
          <p>Congrats, you completed Puxxle (edition {{ edition?.edition }}) in {{ attempts.length }}
            guess{{ attempts.length === 1 ? '' : 'es' }}</p>
          <p><a href="#" @click.prevent="null">Sign in</a> to subscribe and track your scores.</p>
          <p>
            <ConfettiExplosion v-if="hasWon" :force="0.7"/>
            <a v-if="shareCopied" class="btn btn-success disabled" href="#" @click.prevent="null">Copied to
              clipboard</a>
            <a v-else class="btn btn-success" href="#" @click.prevent="shareScore">Share your score</a>
          </p>
          <template v-if="countDown">
            <hr/>
            <h5>Next puzzle {{ countDown.relative }}</h5>
            <p>{{ countDown.display }}</p>
            <a class="btn btn-secondary" href="#">Subscribe and notify me</a>
          </template>
        </div>
      </div>
    </div>
  </div>

  <div ref="winModal_" class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <h3 class="text-center">🎉🎉🎉 YAY 🎉🎉🎉</h3>
          <p>Congrats, you completed Puxxle (edition {{ edition?.edition }}) in {{ attempts.length }}
            guess{{ attempts.length === 1 ? '' : 'es' }}</p>
          <p><a href="#" @click.prevent="null">Sign in</a> to subscribe and track your scores.</p>
          <p>
            <ConfettiExplosion v-if="hasWon" :force="0.7"/>
            <a v-if="shareCopied" class="btn btn-success disabled" href="#" @click.prevent="null">Copied to
              clipboard</a>
            <a v-else class="btn btn-success" href="#" @click.prevent="shareScore">Share your score</a>
          </p>
          <template v-if="countDown">
            <hr/>
            <h5>Next puzzle {{ countDown.relative }}</h5>
            <p>{{ countDown.display }}</p>
            <a class="btn btn-secondary" href="#">Subscribe and notify me</a>
          </template>
        </div>
      </div>
    </div>
  </div>

  <div ref="introModal_" class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <h3 class="text-center">What is Puxxle?</h3>
          <p>Puxxle is a Wordle style game where the aim is to find an array transformation expression.</p>

          <hr/>

          <h6>How to play</h6>
          <p>The aim of Puxxle is to figure out the order and value of a 5 item array.</p>
          <h6>The hook?</h6>
          <p>The array can only be populated through a transformation. You are given an input array, which you map over
            to create a new array with different values.</p>

          <p>If you place a value in the correct spot, it will be <span class="text match">blue</span><br/>
            If the value is too high, it will be <span class="text high">green</span><br/>
            If the value is too low, it will be <span class="text low">red</span><br/>
            If there is an error with your expression, the field will be <span class="text invalid">grey</span></p>

          <hr/>

          <h6>You can choose!</h6>
          <p>Puxxle will accept either a JavaScript or an Excel expression. By default, Puxxle will assume an entry
            is written in JavaScript, unless the entry starts with an "=" sign.</p>
          <p>
            JS example for modulo operation:<br/>
            <code>x % 5</code><br/>
            Excel example for modulo operation<br/>
            <code>=MOD(x, 5)</code>
          </p>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Start the game!</button>
        </div>

      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
//== GENERAL IMPORTS ==//
import {computed, ref, onBeforeMount, nextTick, watch, onMounted} from "vue";
import {UniversleEdition} from "@universle/sdk/src";
import {DateTime} from "luxon";
import {Modal} from "bootstrap";
import {DetailedCellError, HyperFormula} from "hyperformula";

//== COMPONENT IMPORT ==//
import ConfettiExplosion from "vue-confetti-explosion";

//== TYPES & INTERFACES ==//
interface Attempt {
  value: string,
  is_match: boolean
  is_invalid: boolean
  is_high: boolean
  is_low: boolean
}

interface Line {
  input: string
  output: Attempt[]
  is_attempt: boolean
}

//== STORE IMPORT ==//
import {useAppStore} from "@/stores/app";

//== INJECT & PROPS & EMITS =//
const props = defineProps<{
  edition?: string
}>()

//== STORE BINDING ==//
const appStore = useAppStore()

//== DATA & STATE ==//
const edition = ref<UniversleEdition<'null_array'>>()
const input = ref<any[]>()
const prompt = ref<string>('x')
const attempts = ref<Line[]>([])
const hasWon = ref<boolean>(false)
const shareVisible = ref<boolean>(true)
const shareCopied = ref<boolean>(false)
const promptField = ref<HTMLInputElement>()
const winModal_ = ref<HTMLDivElement>()
const introModal_ = ref<HTMLDivElement>()

//== COMPUTED ==//
const inputChecked = computed<Attempt[] | null>(() => {
  if (!edition.value || !input.value) return null

  return edition.value!
      .check(input.value!.map(i => i || ''))
      .map((v, i) => ({
        value: input.value![i] || '',
        is_match: v.validity && v.exactly,
        is_invalid: false,
        is_high: v.polarity === true,
        is_low: v.polarity === false
      }))
})

const attempt = computed<Attempt[] | null>(() => {
  if (!edition.value || !input.value) return null

  const transformed = input.value.map((v) => {
    try {
      const value = JSON.stringify(v);
      let out;
      if (prompt.value.substring(0, 1) == '=') {
        // We are working with an Excel formula
        const engine = HyperFormula.buildFromArray([[
          prompt.value
        ]], {
          licenseKey: 'gpl-v3'
        })
        engine.addNamedExpression('x', `=${value}`)
        out = engine.getCellValue({col: 0, row: 0, sheet: 0})
        if (out instanceof DetailedCellError)
          out = null
      } else {
        // We are working with a JS expression
        // Apply the transformation to the item
        out = eval(`((x) => {
          return ${prompt.value}
        })
        (${value})`)
      }

      if (out !== null && out !== undefined)
        return out.toString().substring(0, 3)
    } catch (ignore) {
    }
    return null

  })

  return edition.value!
      .check(transformed.map(t => t || ''))
      .map((v, i) => {
        const value = transformed[i]
        return {
          value: value || '',
          is_match: v.validity && v.exactly,
          is_invalid: false,
          is_high: value && v.polarity === true,
          is_low: value && v.polarity === false
        }
      })
})

const lines = computed<Line[]>(() => {
  if (!attempt.value) return []
  if (hasWon.value) return attempts.value
  const line: Line = {
    input: prompt.value,
    output: attempt.value,
    is_attempt: false
  }
  return [...attempts.value, line]
})

const countDown = computed(() => {
  if (!edition.value || !edition.value?.next_release_at) return null

  const release = DateTime.fromJSDate(edition.value!.next_release_at)

  if (release <= DateTime.now()) return null

  return {
    relative: release.toRelative(),
    display: release.toFormat("dd LLL yy 'at' HH:mm")
  }
})

const winModal = computed<null | Modal>(() => {
  if (winModal_.value)
    return new Modal(winModal_.value)
  return null
})

const introModal = computed<null | Modal>(() => {
  if (introModal_.value)
    return new Modal(introModal_.value)
  return null
})

//== WATCHER ==//
watch(() => hasWon.value && shareVisible.value, (value) => value && winModal.value?.show())

//== PROVIDE ==//

//== LIFECYCLE HOOK ==//
onBeforeMount(() => {
  const puzzle = props.edition
      ? appStore.universle.edition<'null_array'>(props.edition)
      : appStore.universle.latestEdition<'null_array'>()

  puzzle.then((e) => {
    edition.value = e
    input.value = e.payload.input
    prompt.value = e.payload.prompt
  })
})

onMounted(() => {
  introModal.value?.show()
})

//== METHOD ==//
function itemClass(line: Line | null, item: Attempt) {
  if (line != null && !line.is_attempt) return {'is-invalid': item.is_invalid}
  return {
    'is-match': item.is_match,
    'is-high': item.is_high,
    'is-low': item.is_low,
    'is-invalid': item.is_invalid
  }
}

function add() {
  promptField.value?.focus()

  if (!attempt.value) return
  attempts.value.push({
    input: prompt.value,
    output: [...attempt.value],
    is_attempt: true
  })
  hasWon.value = attempt.value.reduce((win, item) => !win ? win : item.is_match, true)

  // Interface mechanics
  nextTick(() => {
    const container = document.querySelector('.game')
    container?.scrollTo({top: container.scrollHeight, behavior: 'smooth'})
  })
}

function shareScore() {
  let content = `Puzzle (ed. ${edition.value?.edition})\n${window.location}\n\n`
  for (let line of attempts.value) {
    for (let cell of line.output) {
      switch (true) {
        case cell.is_invalid:
          content += '⬜'
          break
        case cell.is_match:
          content += '🟦'
          break;
        case cell.is_high:
          content += '🟩'
          break;
        case cell.is_low:
          content += '🟥'
          break;
        default:
          content += '⬛'
      }
    }
    content += '\n'
  }
  content += `Solved in ${attempts.value.length} guess${attempts.value.length == 1 ? '' : 'es'}`
  navigator.clipboard.writeText(content)
  shareCopied.value = true

  setTimeout(() => shareCopied.value = false, 1500)
}

//== EXPOSE ==//

</script>

<style lang="scss" scoped>
@import "../styles/colours";

.item {
  width: 4rem;
  max-width: calc(calc(100vw - 7rem) / 5);
  height: 4rem;
  max-height: calc(calc(100vw - 7rem) / 5);

  border: 1px solid #aaa;
  border-radius: 1rem;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, .5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;

  &.is-invalid {
    background-color: #aaa;
  }

  &.is-high {
    background-color: rgba($green, .8);
    border-color: rgba($green, .8);
    color: $text;
  }

  &.is-low {
    background-color: rgba($red, .8);
    border-color: rgba($red, .8);
    color: $text;
  }

  &.is-match {
    background-color: $blue;
    border-color: $blue;
  }
}

.text {
  &.invalid {
    color: $grey;
  }

  &.partial {
    color: $yellow;
  }

  &.high {
    color: $green;
  }

  &.low {
    color: $red;
  }

  &.match {
    color: $blue;
  }
}

.prompt {
  @media screen and (max-width: 768px) {
    position: fixed;
    //width: 100vw;
    left: 0;
    right: 0;
    bottom: 35px;
    //margin-left: 0 !important;
    //padding-left: 0 !important;

    @at-root .game-stage {
      margin-bottom: 3rem;
    }
  }
}
</style>
