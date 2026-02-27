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
const success = ref(false)

const resetForm = () => {
  loading.value = false
  success.value = false

  r$.$reset({
    toOriginalState: true,
  })
}

defineExpose({
  resetForm,
})

const onSubmit = async () => {
  try {
    loading.value = true
    success.value = false

    const { valid, data } = await r$.$validate()

    if (!valid) {
      return
    }

    await $fetch('/api/ghl', {
      method: 'POST',
      body: {
        name: data.name.trim(),
        email: data.email.trim(),
        role: data.role.trim(),
        company: data.company.trim(),
        sector: data.sector.trim(),
      },
    })

    success.value = true
  }
  catch (error: any) {
    console.error(error)
    success.value = false
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-10 items-start">
    <template v-if="success">
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
            <FormSelect
              id="sector"
              v-model="r$.$value.sector"
              :options="[
                { label: 'Charity / Not-for-profit', value: 'Charity / Not-for-profit' },
                { label: 'Consumer Goods / Retail', value: 'Consumer Goods / Retail' },
                { label: 'Pharma / Healthcare', value: 'Pharma / Healthcare' },
                { label: 'Financial Services', value: 'Financial Services' },
                { label: 'Agency', value: 'Agency' },
                { label: 'Other', value: 'Other' },
              ]"
              class="type-mono-16"
            />

            <FormMessages
              v-if="r$.sector.$error"
              :messages="r$.sector.$errors"
              class="type-mono-12 text-red mt-2"
            />
          </FormField>

          <button
            type="submit"
            :disabled="loading || undefined"
          >
            <UiButton
              type="outline"
              theme="dark"
            >
              {{ loading ? 'Please wait...' : 'Submit' }}
            </UiButton>
          </button>
        </FormFieldset>
      </FormBase>
    </template>
  </div>
</template>
