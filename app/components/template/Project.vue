<script lang="ts" setup>
import type { Project } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { ISbStoryData } from '@storyblok/js'

interface Props {
  story: ISbStoryData<Project>
}

const { story } = defineProps<Props>()
</script>

<template>
  <pre>{{ story }}</pre>
</template>
