<template>
  <div class="w-full h-full flex justify-center items-center">
    <a-form
      :model="formData"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      class="w-400px"
      @submit="loginSubmit"
    >
      <a-form-item label="用户名" name="username">
        <a-input v-model:value="formData.username"></a-input>
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input-password v-model:value="formData.password"></a-input-password>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 8 }">
        <a-button class="w-full" type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
  import api from '@/api';
  import { reactive } from 'vue';
  import { useUserStore } from '@/store/modules/user';
  import { notification } from 'ant-design-vue';

  const userStore = useUserStore();

  const formData = reactive({
    username: 'admin',
    password: '123456',
  });
  async function loginSubmit(e) {
    const userInfo = await userStore.login(formData);
    notification.success({
      message: '登录成功！',
      description: `欢迎您，${userInfo.name}`,
      duration: 3,
    });
  }
</script>

<style lang="scss" scoped></style>
