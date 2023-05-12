import Mock from "mockjs"
const { mock, Random } = Mock

mock("/login", "post", (options) => {
  const { username, password } = JSON.parse(options.body)
  console.log(username, password)
  if (username === "admin" && password === "123456") {
    return {
      code: 200,
      data: {
        token: Random.id(),
      },
    }
  } else {
    return {
      code: 400,
      errMsg: "用户名或密码有误，请重新输入",
    }
  }
})
mock("/getUserInfo", "get", (options) => {
  return {
    name: Random.name(),
    avatar: Random.dataImage("100*100"),
  }
})
