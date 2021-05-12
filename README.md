# Validator
数据校验工具类


## 实例化类


```
var validator = new Validator({name:"qcx",hobby:["足球"],tel:"18829040776",age:24})
```
## 添加key规则

```
//已经配置好的required（必填校验），minLength（长度校验），isMobile（手机号校验）校验函数
validator.addKey("name",{strategy:"required",message:"请输入名字"})
validator.addKey("hobby",{strategy:"minLength:1",message:"至少选择一种爱好"})
validator.addKey("tel",{strategy:"isMobile",message:"请填写正确的手机号"})
validator.addKey("age",{strategy:"validator",validator:(val)=>{
  if(val>60){
    return "不能是老年人"//不通过返回错误msg
  }else if(val<18){
    return "不能是未成年人"//不通过返回错误msg
  }//通过返回undefined
}})//自定义校验函数
```
## 也可以直接添加值规则

```
validator.add("123",{strategy:"minLength:4",message:"字符长度最少为4"})//直接传入值"123"校验
```
## 开始校验
**1、回调方式**

```
validator.start((msgs)=>{
  if(msgs.length){
    console.log(msgs)//打印错误message，就是你之前传入的message，是个数组，错误信息的顺序与你add的顺序一致
  }else{
    console.log("callback通过了")
  }
})
```

**2、Promise方式**

```
validator.start().then(res=>{
  console.log("通过了")
}).catch(msgs=>{
  console.log(msgs)
})
```