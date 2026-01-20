<script lang="ts" setup>
import { useRegle } from '#imports'
import { email as ruleEmail, required as ruleRequired } from '@regle/rules'

interface Props {
  legend?: string
}

const { legend } = defineProps<Props>()

const { r$ } = useRegle({ email: '' }, {
  email: {
    ruleRequired,
    ruleEmail,
  },
})

const loading = ref<boolean>(false)
const status = ref<{
  type: 'error' | 'success'
  message: string
} | null>(null)

const defaultErrorMessage = 'Please check the form and try again.'

const onSubmit = async () => {
  try {
    loading.value = true

    const { valid, data } = await r$.$validate()

    if (!valid || !data.email) {
      return
    }

    const formData = new FormData()

    formData.append('email', data.email.trim())

    const createApplication = await $fetch('/api/highlevel', {
      method: 'POST',
      body: formData,
    })

    if (!createApplication || createApplication.statusCode !== 200) {
      throw new Error(createApplication?.statusMessage || defaultErrorMessage)
    }

    status.value = {
      type: 'success',
      message: 'Your application has been successfully made.',
    }
  }
  catch (error: any) {
    status.value = {
      type: 'error',
      message: error.statusMessage || defaultErrorMessage,
    }
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <div v-if="status && status.type === 'success'">
      <p class="type-p">
        Thanks for applying with us. We'll review your submission shortly.
      </p>
    </div>

    <template v-else>
      <FormBase
        :loading="loading"
        @submit.prevent="onSubmit"
      >
        <FormFieldset
          :legend="legend"
          a11y
        >
          <div class="w-full flex gap-4 border-b border-current">
            <FormField
              id="email"
              a11y
              label="Email address *"
            >
              <FormInput
                id="email"
                v-model="r$.$value.email"
                placeholder="Your email address"
                field="email"
                class="border-none type-p"
              />
            </FormField>

            <button type="submit">
              <UiButton
                theme-override="light"
                type="outline"
              >
                {{ loading ? '...' : 'Submit' }}
              </UiButton>
            </button>
          </div>

          <FormMessages
            v-if="r$.email.$error"
            :messages="r$.email.$errors"
            class="type-p"
          />
        </FormFieldset>
      </FormBase>
    </template>
  </div>
</template>
