<script lang="ts" setup>
import type { Settings } from '#storyblok-components'
import { useRegle } from '#imports'
import { email as ruleEmail, required as ruleRequired } from '@regle/rules'

interface Props {
  legend?: string
  metadata?: {
    name?: string
    playbackId?: string
    url?: string
  }
}

const { legend, metadata } = defineProps<Props>()

interface Emits {
  (event: 'success'): void
}

const emit = defineEmits<Emits>()

const { r$ } = useRegle({
  name: '',
  email: '',
}, {
  name: {
    ruleRequired,
    $autoDirty: true,
  },
  email: {
    ruleRequired,
    ruleEmail,
  },
})

const loading = ref(false)

const resetForm = () => {
  loading.value = false

  r$.$reset({
    toOriginalState: true,
  })
}

defineExpose({
  resetForm,
})

const settings = await useStory<Settings>('/settings')

const onSubmit = async () => {
  try {
    loading.value = true

    const { valid, data } = await r$.$validate()

    if (!valid) {
      return
    }

    await $fetch('/api/ghl-data-capture', {
      method: 'POST',
      body: {
        name: data.name.trim(),
        email: data.email.trim(),
        videoName: metadata?.name,
        videoPlaybackId: metadata?.playbackId,
        videoUrl: metadata?.url,
      },
    })

    emit('success')
  }
  catch (error: any) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="size-[inherit] bg-offblack/80 text-white">
    <div
      data-lenis-prevent
      class="w-full h-full px-(--app-outer-gutter) py-[calc(var(--app-outer-gutter)*1.5)] overflow-y-auto"
    >
      <div class="flex flex-col min-h-full gap-6 sm:gap-10 justify-center items-start max-w-xl mx-auto">
        <h6
          v-if="settings.content.data_capture_headline"
          class="type-h4 text-[clamp(0.875rem,3vw,1.5rem)] pr-6 text-balance"
        >
          {{ settings.content.data_capture_headline }}
        </h6>

        <FormBase
          :loading="loading"
          @submit.prevent="onSubmit"
        >
          <FormFieldset
            :legend="legend"
            a11y
          >
            <div class="w-full grid grid-cols-1 xs:grid-cols-2 gap-6">
              <FormField
                id="name"
                label="Name"
              >
                <FormInput
                  id="name"
                  v-model="r$.$value.name"
                  placeholder="Joe Bloggs"
                  class="type-mono-16"
                />

                <FormMessages
                  v-if="r$.name.$error"
                  :messages="r$.name.$errors"
                  class="type-mono-12 text-red mt-2"
                />
              </FormField>

              <FormField
                id="email"
                label="Email"
              >
                <FormInput
                  id="email"
                  v-model="r$.$value.email"
                  placeholder="joe.bloggs@example.com"
                  field="email"
                  class="type-mono-16"
                />

                <FormMessages
                  v-if="r$.email.$error"
                  :messages="r$.email.$errors"
                  class="type-mono-12 text-red mt-2"
                />
              </FormField>
            </div>

            <button
              type="submit"
              :disabled="loading || undefined"
            >
              <UiButton
                type="outline"
                theme="dark"
              >
                {{ loading ? 'Please wait...' : 'Play' }}
              </UiButton>
            </button>
          </FormFieldset>
        </FormBase>

        <div
          v-if="storyblokRichTextContent(settings.content.data_capture_text)"
          class="prose [&_p]:type-mono-12 text-pretty text-white/60"
        >
          <StoryblokText :html="settings.content.data_capture_text" />
        </div>
      </div>
    </div>
  </div>
</template>
