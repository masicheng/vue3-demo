import Mock from "mockjs";

Mock.mock('/login','post',{
    status:200,
    data:{
        name:"马四成",
        token:'123'
    }
})