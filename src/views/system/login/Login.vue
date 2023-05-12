<template>
  <div class="w-full h-full flex justify-center items-center">
    <a-form
      :model="formData"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      class="w-400px"
    >
      <a-form-item
        label="用户名"
        name="username"
      >
        <a-input v-model:value="formData.username"></a-input>
      </a-form-item>
      <a-form-item
        label="密码"
        name="password"
      >
        <a-input-password v-model:value="formData.password"></a-input-password>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 8 }">
        <a-button
          class="w-full"
          type="primary"
          html-type="submit"
          @click="loginClick"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import api from "@/api"
import { reactive } from "vue"

const formData = reactive({
  username: "admin",
  password: "1234561",
})
function loginClick() {
  api.login(formData).then((res) => {
    console.log(res)
  })
}
</script>

<style lang="scss" scoped></style>
