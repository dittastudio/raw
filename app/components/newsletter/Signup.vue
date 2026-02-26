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

const loading = ref(false)
const status = ref<{
  type: 'error' | 'success'
  message: string
} | null>(null)

const defaultErrorMessage = 'Please check the form and try again.'

const onSubmit = async () => {
  try {
    loading.value = true

    const { valid, data } = await r$.$validate()

    if (!valid || !data.name || !data.email || !data.role || !data.company || !data.sector) {
      return
    }

    const formData = new FormData()

    formData.append('name', data.name.trim())
    formData.append('email', data.email.trim())
    formData.append('role', data.role.trim())
    formData.append('company', data.company.trim())
    formData.append('sector', data.sector.trim())

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
  <div class="flex flex-col gap-10">
    <template v-if="status && status.type === 'success'">
      <slot name="post" />
    </template>

    <template v-else>
      <slot name="pre" />

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
            label="Name"
          >
            <FormInput
              id="name"
              v-model="r$.$value.name"
              placeholder="Joe Bloggs"
              class="type-mono-16"
              autofocus
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

          <FormField
            id="role"
            label="Role"
          >
            <FormInput
              id="role"
              v-model="r$.$value.role"
              placeholder="Marketing Manager"
              class="type-mono-16"
            />

            <FormMessages
              v-if="r$.role.$error"
              :messages="r$.role.$errors"
              class="type-mono-12 text-red mt-2"
            />
          </FormField>

          <FormField
            id="company"
            label="Company"
          >
            <FormInput
              id="company"
              v-model="r$.$value.company"
              placeholder="Example Inc."
              class="type-mono-16"
            />

            <FormMessages
              v-if="r$.company.$error"
              :messages="r$.company.$errors"
              class="type-mono-12 text-red mt-2"
            />
          </FormField>

          <FormField
            id="sector"
            label="Sector"
          >
            <FormInput
              id="sector"
              v-model="r$.$value.sector"
              placeholder="Charity Healthcare"
              class="type-mono-16"
            />

            <FormMessages
              v-if="r$.sector.$error"
              :messages="r$.sector.$errors"
              class="type-mono-12 text-red mt-2"
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
