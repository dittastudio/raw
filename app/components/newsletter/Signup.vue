<script lang="ts" setup>
import { useRegle } from '#imports'
import { email as ruleEmail, required as ruleRequired } from '@regle/rules'

interface Props {
  legend?: string
}

const { legend } = defineProps<Props>()

const { r$ } = useRegle({
  name: '',
  email: '',
  role: '',
  company: '',
  sector: '',
}, {
  name: {
    ruleRequired,
  },
  email: {
    ruleRequired,
    ruleEmail,
  },
  role: {
    ruleRequired,
  },
  company: {
    ruleRequired,
  },
  sector: {
    ruleRequired,
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
          <FormField
            id="name"
            a11y
            label="Name *"
          >
            <FormInput
              id="name"
              v-model="r$.$value.name"
              placeholder="Name"
              class="type-mono-16"
            />

            <FormMessages
              v-if="r$.name.$error"
              :messages="r$.name.$errors"
              class="type-mono-14"
            />
          </FormField>

          <FormField
            id="email"
            a11y
            label="Email address *"
          >
            <FormInput
              id="email"
              v-model="r$.$value.email"
              placeholder="Email address"
              field="email"
              class="type-mono-16"
            />

            <FormMessages
              v-if="r$.email.$error"
              :messages="r$.email.$errors"
              class="type-mono-14"
            />
          </FormField>

          <FormField
            id="role"
            a11y
            label="Role *"
          >
            <FormInput
              id="role"
              v-model="r$.$value.role"
              placeholder="Role"
              class="type-mono-16"
            />

            <FormMessages
              v-if="r$.role.$error"
              :messages="r$.role.$errors"
              class="type-mono-14"
            />
          </FormField>

          <FormField
            id="company"
            a11y
            label="Company *"
          >
            <FormInput
              id="company"
              v-model="r$.$value.company"
              placeholder="Company"
              class="type-mono-16"
            />

            <FormMessages
              v-if="r$.company.$error"
              :messages="r$.company.$errors"
              class="type-mono-14"
            />
          </FormField>

          <FormField
            id="sector"
            a11y
            label="Sector *"
          >
            <FormInput
              id="sector"
              v-model="r$.$value.sector"
              placeholder="Sector"
              class="type-mono-16"
            />

            <FormMessages
              v-if="r$.sector.$error"
              :messages="r$.sector.$errors"
              class="type-mono-14"
            />
          </FormField>

          <button type="submit">
            <UiButton
              type="outline"
              theme="dark"
            >
              {{ loading ? '...' : 'Submit' }}
            </UiButton>
          </button>
        </FormFieldset>
      </FormBase>
    </template>
  </div>
</template>
