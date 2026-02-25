<script lang="ts" setup>
interface Props {
  filterId: string
  stdDeviation?: number
}

const { filterId, stdDeviation = 7 } = defineProps<Props>()
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="absolute size-0 opacity-0 pointer-events-none"
  >
    <defs>
      <filter :id="filterId">
        <feGaussianBlur
          in="SourceGraphic"
          :stdDeviation="stdDeviation"
          result="blur"
        />

        <feComponentTransfer
          in="blur"
          :result="filterId"
        >
          <feFuncA
            type="linear"
            slope="17"
            intercept="-8"
          />
        </feComponentTransfer>

        <feComposite
          in="SourceGraphic"
          :in2="filterId"
          operator="atop"
        />
      </filter>
    </defs>
  </svg>
</template>
