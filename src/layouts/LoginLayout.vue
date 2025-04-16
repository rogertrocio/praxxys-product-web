<template>
  <div class="bg-[#f5f5f5]">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="flex items-center mb-10">
        <img class="w-full h-8 mr-2" :src="logo" alt="logo" />
      </div>
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="login">
            <InputText
              v-model="model.username"
              label="Username"
              placeholder="Username or Email"
              @keydown="errors.username = null"
              :error="errors.username" />

            <PasswordText v-model="model.password" label="Password" />

            <div class="flex items-center justify-between">
              <Checkbox v-model="model.remember" label="Remember me" />

              <a href="#" class="text-sm font-medium text-teal-600 hover:underline">Forgot password?</a >
            </div>

            <ActionButton type="button" label="Sign in"/>

            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import InputText from '@/components/base/BaseInput.vue'
import PasswordText from '@/components/base/BasePassword.vue'
import Checkbox from '@/components/base/BaseCheckbox.vue'
import ActionButton from '@/components/base/BaseButton.vue'
import logo from '../assets/praxxys-logo.webp'

const model = reactive({
  username: null,
  password: null,
  remember: false,
})

const errors = reactive({
  username: null,
})

const login = () => {
  console.log(model)
}
</script>
