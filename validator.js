const strategies = {
  required:function(value,errorMsg){
    if(value==='' || value===null || value===undefined){
      return errorMsg
    }
  },
  minLength:function(value,length,errorMsg){
    if(value.length<length){
      return errorMsg
    }
  },
  isMobile:function(value,errorMsg){
    if(!(/^1[3456789]d{9}$/.test(value))){
      return errorMsg
    }
  },
  validator:function(value,errorMsg,fn){
    return fn(value)
  }
}
class Validator{
  constructor(data){
    this.cache = [];
    this.data = data || {};
  }
  add(value,rules) {
    rules = Array.isArray(rules)?rules:[rules];
    let self = this;
    for(let rule of rules){
      (function(rule){
        self.cache.push(function(){
          let strategyAry = rule.strategy.split(":");
          let errorMsg = rule.message;
          let customValidator = rule.validator;
          let strategy = strategyAry.shift();
          strategyAry.unshift(value);
          strategyAry.push(errorMsg);
          strategyAry.push(customValidator)
          return strategies[strategy].apply(this,strategyAry);
        })
      })(rule)   
    }
  }
  addKey(key,rules){
    var keys = key.split(".");
    var data = this.data;
    for(let k of keys){
      if(!data.hasOwnProperty(k))return false;
      data = data[k]
    };
    add(data,rules);
  }
  start(calback){
    let msg = [];
    for(let fn of this.cache){
      let error = fn();
      error && msg.push(error)
    }
    console.log(msg)
    calback && calback(msg);
  }
}
export default Validator;