<template>
  <q-card v-if="binding" dark class="clubCard">
    <q-card-section horizontal>
      <q-card-section>
        <q-badge class="clubButtonActive">{{ binding.name }}</q-badge>
      </q-card-section>
      <q-card-section>
        <p v-html="binding.description" />

        <small>parameters:</small>
        <div v-for="prop in binding.props" :key="prop.key">
          <q-badge class="bg-white text-black">{{ prop.label }}</q-badge>
          &mdash; {{ prop.description }}
        </div>
        <div class="q-pa-sm"></div>

        <template v-if="'input' in binding">
          <small>input:</small>
          <div v-for="input in binding.input" :key="input.key">
            <q-badge class="bg-white text-black" v-if="showKeys">{{
              input.key
            }}</q-badge>
            <q-badge class="bg-white text-black" v-else>{{
              input.label
            }}</q-badge>
            &mdash; {{ input.description }}
          </div>
        </template>

        <template v-if="'output' in binding">
          <small>output:</small>
          <div v-for="output in binding.output" :key="output.key">
            <q-badge class="bg-white text-black" v-if="showKeys">{{
              output.key
            }}</q-badge>
            <q-badge class="bg-white text-black" v-else>{{
              output.label
            }}</q-badge>
            &mdash; {{ output.description }}
          </div>
        </template>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IAppAction, IAppEvent } from '../../appManager/shared/IAppConfig';

export default defineComponent({
  components: {},
  props: {
    binding: {
      type: Object as PropType<IAppEvent | IAppAction>,
    },
    showKeys: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
