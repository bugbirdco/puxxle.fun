<template>
  <div class="mt-5">
    <div>
      <template v-for="line in lines">
        <div class="d-flex justify-content-center py-2 px-4">
          <div v-for="item in line.output" class="item mx-1" :class="itemClass(line, item)">
            {{ item.value }}
          </div>
        </div>
      </template>
      <div class="mx-4 px-3 mt-2">
        <div class="row g-2">
          <div class="col col-9 d-flex flex-column align-items-center">
            <input v-model="prompt" :disabled="hasWon" class="form-control form-control-lg" autocorrect="off"
                   autocapitalize="none" @keydown.enter="add"/>
          </div>
          <div class="col">
            <button type="button" :disabled="hasWon" class="btn btn-primary btn-lg w-100 h-100" @click="add">Go</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" :class="{'show d-block': hasWon && shareVisible}">
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


</template>

<script lang="ts" setup>
//== GENERAL IMPORTS ==//
import {computed, ref, onBeforeMount} from "vue";
import {UniversleEdition} from "@universle/sdk/src";
import {DateTime} from "luxon";

//== COMPONENT IMPORT ==//
import ConfettiExplosion from "vue-confetti-explosion";

//== TYPES & INTERFACES ==//
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
import {useAppStore} from "@/stores/app";

//== INJECT & PROPS & EMITS =//
const props = defineProps<{
  edition?: string
}>()

//== STORE BINDING ==//
const appStore = useAppStore()

//== DATA & STATE ==//
const edition = ref<UniversleEdition<'positional_array'>>()
const input = ref<any[]>()
const prompt = ref<string>('x')
const attempts = ref<Line[]>([])
const hasWon = ref<boolean>(false)
const shareVisible = ref<boolean>(true)
const shareCopied = ref<boolean>(false)

//== COMPUTED ==//
const attempt = computed<Attempt[] | null>(() => {
  if (!edition.value || !input.value) return null

  const transformed = input.value.map((v) => {
    try {
      // Apply the transformation to the item
      let response = eval(`((x) => {
        return ${prompt.value}
      })
      (${JSON.stringify(v)})`)
      return response ? (response.toString().substring(0, 3)) : ''
    } catch (e) {
      return null
    }
  })

  return edition.value!
      .check(transformed.map(t => t || ''))
      .map((v, i) => {
        return {
          value: transformed[i] || '',
          is_match: v == 'valid',
          is_partial: v == 'partial',
          is_invalid: transformed[i] == null
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

//== WATCHER ==//

//== PROVIDE ==//

//== LIFECYCLE HOOK ==//
onBeforeMount(() => {
  const puzzle = props.edition
      ? appStore.universle.edition<'positional_array'>(props.edition)
      : appStore.universle.latestEdition<'positional_array'>()

  puzzle.then((e) => {
    edition.value = e
    input.value = e.payload.input
    prompt.value = e.payload.prompt
  })
})

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
  if (!attempt.value) return
  attempts.value.push({
    input: prompt.value,
    output: [...attempt.value],
    is_attempt: true
  })
  hasWon.value = attempt.value.reduce((win, item) => !win ? win : item.is_match, true)
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
          content += '🟩'
          break;
        case cell.is_partial:
          content += '🟨'
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
// #F5F5F5 - Text
// #050517 - BG
// #AAAAAA - Grey
// #1B5B3E - Green
// #F0CD57 - Yellow
// #8B2635 - Red

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

  &.is-partial {
    background-color: #F0CD57;
    border-color: #F0CD57;
    color: #000;
  }

  &.is-match {
    background-color: #1B5B3E;
    border-color: #1B5B3E;
  }
}
</style>
