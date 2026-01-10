<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm, useValidateForm } from 'vee-validate'
import { z } from 'zod'

interface Props {
  legend?: string
}

const { legend } = defineProps<Props>()
const loading = ref<boolean>(false)
const status = ref<{
  type: 'error' | 'success'
  message: string
} | null>(null)

const validationSchema = toTypedSchema(
  z.object({
    email: z
      .email()
      .trim(),
  }),
)

const { errors } = useForm({
  validationSchema,
  initialValues: {
    email: '',
  },
})

const validate = useValidateForm()
const { value: email } = useField<string>('email')
const defaultErrorMessage = 'Please check the form and try again.'

const onSubmit = async () => {
  try {
    loading.value = true

    const { valid } = await validate()

    if (!valid) {
      return
    }

    const formData = new FormData()

    formData.append('email', email.value.trim())

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
                v-model="email"
                placeholder="Your email address"
                field="email"
                class="border-none type-p"
              />
            </FormField>

            <button type="submit">
              <UiButton
                colour="light"
                mode="outline"
              >
                {{  loading ? '...' : 'Submit' }}
              </UiButton>
            </button>
          </div>

          <FormMessage
            v-if="errors.email"
            :message="errors.email"
            class="type-p"
          />
        </FormFieldset>

        <FormMessage
          v-if="status"
          :type="status.type"
          :message="status.message"
        />
      </FormBase>
    </template>
  </div>
</template>
