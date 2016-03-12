var validatorjs = require('validator');
var validatorExt = { // 保存自定义的校验规则
  isRequired(value){
    if(typeof value === 'string')
      return value.trim() !== '';
    return true;
  }
};

// 校验器
class Validation{
  rules = {};// 校验规则, key是规则名, value是参数

  constructor(rules) {
    this.rules = rules;
  }

  /**
   * 添加新的校验器
   * @param rule 规则名
   * @param func 规则函数, 校验规则就是执行该函数, 根据返回值来确定是否校验成功
   */
  static addValidator(rule, func){
    validatorExt[rule] = func;
  }

  /**
   * 解析校验规则的字符串
   * @parma validations 校验规则的字符串
   */
  static parse(validations) {
    // 解析校验规则
    var rules = null;
    if (typeof validations === 'string') {
      // 解析多个校验规则: 以,分割
      rules = validations.split(/\,(?![^{\[]*[}\]])/g).reduce(function (rules, validation) {
        var args = validation.split(':'); // 解析单个校验规则: 以:分割方法名+参数
        var rule = args.shift(); // 获得校验规则
        // 获得参数
        args = args.map(function (arg) {
          try {
            return JSON.parse(arg);
          } catch (e) {
            return arg; // It is a string if it can not parse it
          }
        });
        // 参数只能接收一个, 如果有多个, 请以json格式来写
        if (args.length > 1) {
          throw new Error('SKForm Error: does not support multiple args on string validations. Use object format of validations instead.');
        }

        rules[rule] = Array.isArray(args[0]) ? args[0] : args; // 如果第一个参数是数组，则直接使用第一个参数
        return rules;
      }, {});
    }
    return new Validation(rules || {});
  }

  /**
   * 翻译参数: 将其他字段值替换到参数中
   * @param args 参数
   * @param values 表单所有字段的值
   * @return
   */
  translateArgs(args, values){
    // console.log(args);
    return args && args.map((arg) => {
      if(typeof arg === 'string'){
        return arg.replace(/^#(.+)$/g, function (all, name) {
          return values[name];
        });
      }
      return arg;
    })
  }

  /**
   * 校验规则
   *
   *
   */
  check(value, values){
    for (var rule in this.rules) {
      // 1 获得参数
      var args = this.rules[rule];
      args = !Array.isArray(args) ? [args] : args;
      // 复制
      var clonedArgs = args.slice(0);
      // 翻译参数
      clonedArgs = this.translateArgs(clonedArgs, values);
      // 将value添加到参数中
      clonedArgs.unshift(value);

      // 2 执行规则
      var isValid;
      if (typeof rule === 'function') {
        isValid = rule.apply(null, clonedArgs); // 执行校验规则
      } else {
        var validator = validatorExt[rule] || validatorjs[rule];
        if (typeof validator === 'undefined') {
          console.warn('SKForm Error: No validator for rule: ' + rule);
          continue;
        }

        if (rule === 'isLength') {
          if (typeof clonedArgs[0] === 'string') {
            clonedArgs[0] = clonedArgs[0].trim();
          }
        }

        isValid = validator.apply(null, clonedArgs); // 执行校验规则
      }

      if(!isValid)
        return {
          isValid,
          rule,
          args: clonedArgs
        }
    }
    return {
      isValid : true,
      rule : '',
      args : null,
    };
  }
}

module.exports = Validation;
